import { NextResponse } from 'next/server'
import { z } from 'zod'

const emiSchema = z.object({
  principal: z.number().positive(),
  annualInterestRate: z.number().positive(),
  tenureMonths: z.number().positive(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { principal, annualInterestRate, tenureMonths } = emiSchema.parse(body)

    const P = principal
    const R = annualInterestRate / 12 / 100
    const N = tenureMonths

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
    const totalPayment = emi * N
    const totalInterest = totalPayment - P

    return NextResponse.json({
      monthlyEmi: Number(emi.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
