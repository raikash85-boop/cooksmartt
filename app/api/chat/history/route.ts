import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth-utils'

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const url = new URL(req.url)
    const counterpartId = url.searchParams.get('userId')
    if (!counterpartId) return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 })

    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: payload.userId, receiverId: counterpartId },
          { senderId: counterpartId, receiverId: payload.userId },
        ]
      },
      orderBy: { timestamp: 'asc' },
      take: 50
    })

    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
