export type Tool = {
  name: string
  plan: string
  seats: number
  monthlySpend: number
}

export type AuditResult = {
  tool: string
  currentSpend: number
  recommendedAction: string
  savings: number
  reason: string
}

export type AuditSummary = {
  results: AuditResult[]
  totalMonthlySavings: number
  totalAnnualSavings: number
}

export function runAudit(tools: Tool[], teamSize: number, useCase: string): AuditSummary {
  const results: AuditResult[] = tools.map(tool => auditTool(tool, teamSize, useCase))
  const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0)
  return {
    results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12
  }
}

function auditTool(tool: Tool, teamSize: number, useCase: string): AuditResult {
  const { name, plan, seats, monthlySpend } = tool

  if (name === 'cursor') {
    if (plan === 'business' && seats <= 2) {
      return {
        tool: 'Cursor',
        currentSpend: monthlySpend,
        recommendedAction: 'Downgrade to Pro plan',
        savings: monthlySpend - (seats * 20),
        reason: 'Business plan ($40/seat) is overkill for ' + seats + ' users. Pro ($20/seat) covers all core features.'
      }
    }
    if (plan === 'pro' && useCase === 'writing') {
      return {
        tool: 'Cursor',
        currentSpend: monthlySpend,
        recommendedAction: 'Switch to Claude Pro for writing tasks',
        savings: monthlySpend - (seats * 20),
        reason: 'Cursor is optimized for coding. For writing, Claude Pro is cheaper and more capable.'
      }
    }
  }

  if (name === 'github_copilot') {
    if (plan === 'business' && seats <= 3) {
      return {
        tool: 'GitHub Copilot',
        currentSpend: monthlySpend,
        recommendedAction: 'Downgrade to Individual plan',
        savings: monthlySpend - (seats * 10),
        reason: 'Business plan ($19/seat) adds admin features not needed for ' + seats + ' users. Individual ($10/seat) is sufficient.'
      }
    }
  }

  if (name === 'claude') {
    if (plan === 'team' && seats <= 2) {
      return {
        tool: 'Claude',
        currentSpend: monthlySpend,
        recommendedAction: 'Switch to Pro plan',
        savings: monthlySpend - (seats * 20),
        reason: 'Team plan ($30/seat, 5-seat minimum) is wasteful for ' + seats + ' users. Pro at $20/seat saves money.'
      }
    }
  }

  if (name === 'chatgpt') {
    if (plan === 'team' && seats <= 2) {
      return {
        tool: 'ChatGPT',
        currentSpend: monthlySpend,
        recommendedAction: 'Switch to Plus plan',
        savings: monthlySpend - (seats * 20),
        reason: 'Team plan ($30/seat) has a 2-seat minimum but adds features most small teams do not use.'
      }
    }
  }

  return {
    tool: name,
    currentSpend: monthlySpend,
    recommendedAction: 'No change needed',
    savings: 0,
    reason: 'Your current plan appears well-matched to your usage.'
  }
}