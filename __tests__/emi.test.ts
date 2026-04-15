import { POST } from '@/app/api/emi/calculate/route'

describe('EMI Calculation API', () => {
  it('should correctly calculate EMI based on valid inputs', async () => {
    // 50,000 principal, 5% annual rate, 12 months
    const mockPayload = {
      principal: 50000,
      annualInterestRate: 5,
      tenureMonths: 12
    }

    const request = new Request('http://localhost/api/emi/calculate', {
      method: 'POST',
      body: JSON.stringify(mockPayload)
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    // Formula check: (50000 * (5/12/100) * (1+(5/12/100))^12) / ((1+(5/12/100))^12 - 1)
    // EMI approx = 4280.37
    expect(data.monthlyEmi).toBeCloseTo(4280.37, 1)
    expect(data.totalPayment).toBeCloseTo(51364.5, 0)
    expect(data.totalInterest).toBeGreaterThan(0)
  })

  it('should reject requests with missing parameters', async () => {
    const request = new Request('http://localhost/api/emi/calculate', {
      method: 'POST',
      body: JSON.stringify({ principal: 50000 }) // Missing rate and tenure
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    
    const data = await response.json()
    expect(data.error).toBeDefined()
  })

  it('should reject requests with negative parameters', async () => {
    const request = new Request('http://localhost/api/emi/calculate', {
      method: 'POST',
      body: JSON.stringify({
        principal: -50000,
        annualInterestRate: 5,
        tenureMonths: 12
      })
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
