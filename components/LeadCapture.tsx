'use client'

import { useState } from 'react'

type Props = {
  auditId: string | null
  totalMonthlySavings: number
}

export default function LeadCapture({ auditId, totalMonthlySavings }: Props) {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email')
      return
    }

    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, companyName, role, auditId })
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <p className="text-green-800 font-semibold text-lg">Report sent!</p>
        <p className="text-green-700 text-sm mt-1">
          Check your inbox for your audit report.
        </p>
        {totalMonthlySavings > 500 && (
          <p className="text-green-700 text-sm mt-2">
            Given your savings opportunity, the Credex team will reach out shortly.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="font-semibold text-gray-900 mb-1">
        Get your report by email
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Free. No spam. Unsubscribe any time.
      </p>

      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="website"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Company name (optional)"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Your role (optional)"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send me the report'}
        </button>
      </div>
    </div>
  )
}