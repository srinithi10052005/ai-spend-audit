import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type AuditResult = {
  tool: string
  currentSpend: number
  recommendedAction: string
  savings: number
  reason: string
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const { data } = await supabase
    .from('audits')
    .select('total_monthly_savings, total_annual_savings')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Audit not found' }

  const title = 'AI Spend Audit — Save $' + data.total_monthly_savings + '/mo'
  const description = 'This team could save $' + data.total_annual_savings + '/year on AI tools.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary', title, description }
  }
}

function formatMoney(amount: number) {
  return '$' + amount.toFixed(0)
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params

  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const results: AuditResult[] = JSON.parse(data.summary)
  const monthly = Number(data.total_monthly_savings)
  const annual = Number(data.total_annual_savings)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Spend Audit
          </h1>
          <p className="text-gray-500">Shared audit report</p>
        </div>

        <div className="bg-black text-white rounded-2xl p-8 text-center mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Potential monthly savings
          </p>
          <p className="text-5xl font-bold mb-1">
            {formatMoney(monthly)}
          </p>
          <p className="text-gray-400 text-sm">
            {formatMoney(annual) + ' per year'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Tool breakdown
          </h2>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 capitalize">
                    {r.tool.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {r.reason}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    {r.recommendedAction}
                  </p>
                </div>
                <div className="text-right ml-4">
                  {r.savings > 0 ? (
                    <p className="text-green-600 font-semibold">
                      {'Save ' + formatMoney(r.savings) + '/mo'}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">Optimal</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <p className="font-semibold text-gray-900 mb-1">
            Run your own audit
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Free, instant, no login required
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Audit my AI spend
          </a>
        </div>
      </div>
    </main>
  )
}