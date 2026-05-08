import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tools, teamSize, useCase, results, totalMonthlySavings, totalAnnualSavings } = body

    const { data, error } = await supabase
      .from('audits')
      .insert({
        tools,
        team_size: teamSize,
        use_case: useCase,
        total_monthly_savings: totalMonthlySavings,
        total_annual_savings: totalAnnualSavings,
        summary: JSON.stringify(results)
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
  }
}