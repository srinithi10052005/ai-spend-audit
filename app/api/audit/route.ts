import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tools, teamSize, useCase, totalMonthlySavings, totalAnnualSavings, results } = body

    const toolList = tools.map((t: any) =>
      t.name + ' (' + t.plan + ' plan, ' + t.seats + ' seats, $' + t.monthlySpend + '/mo)'
    ).join(', ')

    const recommendationList = results.map((r: any) =>
      r.tool + ': ' + r.recommendedAction + ' — saves $' + r.savings + '/mo'
    ).join('. ')

    const prompt = `You are an AI spend analyst helping startups optimize their AI tool costs.
A team of ${teamSize} people uses these AI tools: ${toolList}.
Their primary use case is: ${useCase}.
Total potential monthly savings: $${totalMonthlySavings}. Annual: $${totalAnnualSavings}.
Recommendations: ${recommendationList}.
Write a 100-word personalized audit summary in one paragraph. End with one actionable next step.`

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await res.json()

    // Debug — shows exactly what Gemini returns
    console.log('Gemini full response:', JSON.stringify(data, null, 2))

    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text ?? null

    if (!summary) throw new Error('No summary returned')

    return NextResponse.json({ summary })

  } catch (err) {
    console.error('Gemini API error:', err)

    const fallback = 'Your audit is complete. Based on your current AI tool usage, there are clear opportunities to reduce spend by switching plans or tools better matched to your team size and use case. Review the recommendations above and start with the highest-savings change first — small optimisations compound quickly and could save your team thousands over the next year.'

    return NextResponse.json({ summary: fallback })
  }
}