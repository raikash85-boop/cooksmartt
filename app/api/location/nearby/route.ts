import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    // Note: A true production scale requires PostGIS bounds filtering, 
    // but we retrieve all active vetted sellers for broad hydration.
    const onlineSellers = await db.sellerProfile.findMany({
      where: { isOnline: true, verified: true },
      include: {
        user: { select: { email: true } },
        gpsRecords: { // Fetch the single most recent ping
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    })

    const sanitized = onlineSellers.map(s => ({
      sellerId: s.id,
      company: s.companyName,
      rating: s.rating,
      lastLocation: s.gpsRecords[0] || null
    }))

    return NextResponse.json({ activeSellers: sanitized })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
