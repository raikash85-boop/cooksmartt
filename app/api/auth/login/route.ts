import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'
import { signToken } from '@/lib/auth-utils'
import rateLimit from '@/lib/rate-limit'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 })

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    await limiter.check(10, ip) // Max 10 login attempts per minute per IP

    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    const res = NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role },
      token,
      role: user.role,
    }, { status: 200 })

    // Optional: Set HTTP-Only Cookie for additional layer of security
    res.cookies.set('token', token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
       path: '/'
    })

    return res

  } catch (error) {
    if (error === 'Rate limit exceeded') {
      return NextResponse.json({ error: 'Too many login attempts' }, { status: 429 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
