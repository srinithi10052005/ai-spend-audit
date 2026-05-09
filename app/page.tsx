'use client'

import { useState, useEffect } from 'react'
import SpendForm from '@/components/SpendForm'
import AuditResults from '@/components/AuditResults'
import { runAudit, AuditSummary, Tool } from '@/lib/auditEngine'

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([
    { name: 'cursor', plan: 'pro', seats: 1, monthlySpend: 20 }
  ])

  const [teamSize, setTeamSize] = useState(1)
  const [useCase, setUseCase] = useState('coding')
  const [auditResult, setAuditResult] = useState<AuditSummary | null>(null)
  const [auditId, setAuditId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('spendform')

    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        setTools(parsed.tools)
        setTeamSize(parsed.teamSize)
        setUseCase(parsed.useCase)
      } catch (e) {
        console.error('Failed to load saved form', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'spendform',
      JSON.stringify({
        tools,
        teamSize,
        useCase
      })
    )
  }, [tools, teamSize, useCase])

  async function handleAudit() {
    const result = runAudit(tools, teamSize, useCase)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tools,
          teamSize,
          useCase,
          results: result.results,
          totalMonthlySavings: result.totalMonthlySavings,
          totalAnnualSavings: result.totalAnnualSavings
        })
      })

      const data = await res.json()

      if (data.id) {
        setAuditId(data.id)
        window.history.pushState({}, '', `/audit/${data.id}`)
      }
    } catch (err) {
      console.error('Failed to save audit', err)
    }

    setAuditResult(result)
  }

  function addTool() {
    setTools([
      ...tools,
      {
        name: 'chatgpt',
        plan: 'plus',
        seats: 1,
        monthlySpend: 20
      }
    ])
  }

  function removeTool(index: number) {
    setTools(tools.filter((_, i) => i !== index))
  }

  function updateTool(
    index: number,
    field: keyof Tool,
    value: string | number
  ) {
    const updated = [...tools]

    updated[index] = {
      ...updated[index],
      [field]: value
    }

    setTools(updated)
  }

  function handleReset() {
    setAuditResult(null)
    setAuditId(null)

    window.history.pushState({}, '', '/')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Spend Audit
          </h1>

          <p className="text-lg text-gray-500">
            Find out if you are overpaying for AI tools — free, instant,
            no login required.
          </p>
        </div>

        {!auditResult ? (
          <SpendForm
            tools={tools}
            teamSize={teamSize}
            useCase={useCase}
            onUpdateTool={updateTool}
            onAddTool={addTool}
            onRemoveTool={removeTool}
            onTeamSizeChange={setTeamSize}
            onUseCaseChange={setUseCase}
            onSubmit={handleAudit}
          />
        ) : (
          <AuditResults
            result={auditResult}
            auditId={auditId}
            tools={tools}
            teamSize={teamSize}
            useCase={useCase}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  )
}