import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, companyName, role, auditId } = body

    // Basic honeypot check
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Save lead to Supabase
    const { error } = await supabase
      .from('leads')
      .insert({
        email,
        company_name: companyName || null,
        role: role || null,
        audit_id: auditId || null
      })

    if (error) throw error

    // Send confirmation email via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'AI Spend Audit <onboarding@resend.dev>',
          to: email,
          subject: 'Your AI Spend Audit Report',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">Your audit is saved</h1>
              <p style="color: #6b7280; margin-bottom: 24px;">
                Thanks for using AI Spend Audit. Here is a summary of what we found.
              </p>
              <p style="color: #374151;">
                We have identified potential savings in your current AI tool stack.
                Review your full report and start with the highest-savings change first.
              </p>
              <div style="margin: 32px 0;">
                
                  href="https://ai-spend-audit.vercel.app"
                  style="background: black; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;"
                >
                  View your full report
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 14px;">
                If you have significant savings opportunities, the Credex team may reach out
                to help you capture even more value through discounted AI credits.
              </p>
            </div>
          `
        })
      })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}