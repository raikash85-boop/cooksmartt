import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken } from '@/lib/auth-utils'

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    let token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) {
        const cookieHeader = req.headers.get('cookie')
        const cookies = Object.fromEntries(
            cookieHeader?.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)) || []
        )
        token = cookies['token'] || null
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const totalUsers = await db.user.count({ where: { role: 'USER' } })
    const totalSellers = await db.user.count({ where: { role: 'SELLER' } })
    const totalRecommendations = await db.recommendationHistory.count()
    
    const popularOptions = await db.recommendationHistory.groupBy({
      by: ['selectedOption'],
      _count: { selectedOption: true },
      orderBy: { _count: { selectedOption: 'desc' }},
      take: 5
    })
    
    return NextResponse.json({
      users: totalUsers,
      sellers: totalSellers,
      recommendationsGenerated: totalRecommendations,
      popularOptions
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
