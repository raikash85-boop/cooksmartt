import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'
import { signToken } from '@/lib/auth-utils'
import rateLimit from '@/lib/rate-limit'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['USER', 'SELLER', 'ADMIN']).optional().default('USER'),
  companyName: z.string().min(2).optional(),
})

const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 })

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    await limiter.check(5, ip) // Max 5 registrations per minute per IP

    const body = await req.json()
    const { email, password, role, companyName } = registerSchema.parse(body)

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.user.create({
      data: { email, password: hashedPassword, role },
    })

    // Auto-create SellerProfile when registering as a seller
    if (role === 'SELLER') {
      await db.sellerProfile.create({
        data: {
          userId: user.id,
          companyName: companyName || email.split('@')[0],
        },
      })
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    return NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role },
      token,
      role: user.role,
    }, { status: 201 })
  } catch (error) {
    if (error === 'Rate limit exceeded') {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
