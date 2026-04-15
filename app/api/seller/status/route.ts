import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth-utils'

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const payload = verifyToken(token)
    if (!payload || payload.role !== 'SELLER') {
      return NextResponse.json({ error: 'Forbidden. Seller access required.' }, { status: 403 })
    }

    const { isOnline } = await req.json()
    
    const updatedProfile = await db.sellerProfile.update({
      where: { userId: payload.userId },
      data: { isOnline: Boolean(isOnline) }
    })

    return NextResponse.json({ success: true, isOnline: updatedProfile.isOnline })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
