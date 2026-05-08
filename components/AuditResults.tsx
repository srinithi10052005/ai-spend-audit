'use client'

import { AuditSummary } from '@/lib/auditEngine'

type Props = {
  result: AuditSummary
  onReset: () => void
}

export default function AuditResults({ result, onReset }: Props) {
  const { results, totalMonthlySavings, totalAnnualSavings } = result

  return (
    <div className="space-y-6">

      {/* Hero savings */}
      <div className="bg-black text-white rounded-2xl p-8 text-center">
        <p className="text-sm text-gray-400 mb-2">Potential monthly savings</p>
        <p className="text-5xl font-bold mb-1">${totalMonthlySavings.toFixed(0)}</p>
        <p className="text-gray-400 text-sm">${totalAnnualSavings.toFixed(0)} per year</p>

        {totalMonthlySavings > 500 && (
          <div className="mt-6 bg-white text-black rounded-xl p-4">
            <p className="font-semibold">You could save even more with Credex</p>
            <p className="text-sm text-gray-600 mt-1">
              Get discounted AI credits and capture these savings immediately.
            </p>
            <button className="mt-3 bg-black text-white px-6 py-2 rounded-lg text-sm font-medium">
              Book a free Credex consultation →
            </button>
          </div>
        )}
      </div>

      {/* Per tool breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Tool-by-tool breakdown</h2>
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="font-medium text-gray-900 capitalize">{r.tool.replace('_', ' ')}</p>
                <p className="text-sm text-gray-500 mt-1">{r.reason}</p>
                <p className="text-sm text-gray-700 mt-1 font-medium">{r.recommendedAction}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-400">${r.currentSpend}/mo</p>
                {r.savings > 0 ? (
                  <p className="text-green-600 font-semibold">Save ${r.savings.toFixed(0)}/mo</p>
                ) : (
                  <p className="text-gray-400 text-sm">✓ Optimal</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Already optimal message */}
      {totalMonthlySavings === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-green-800 font-semibold">You're spending well 👍</p>
          <p className="text-green-700 text-sm mt-1">
            Your current AI stack looks well-optimised for your team size and use case.
          </p>
        </div>
      )}

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full border border-gray-300 rounded-lg py-3 text-sm text-gray-600 hover:bg-gray-50"
      >
        ← Start a new audit
      </button>
    </div>
  )
}