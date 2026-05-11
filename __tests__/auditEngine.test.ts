import { runAudit, Tool } from '@/lib/auditEngine'

// Test 1 — Cursor Business with 2 seats should recommend downgrade to Pro
test('Cursor Business with 2 seats recommends downgrade to Pro', () => {
  const tools: Tool[] = [
    { name: 'cursor', plan: 'business', seats: 2, monthlySpend: 80 }
  ]
  const result = runAudit(tools, 2, 'coding')
  const cursorResult = result.results[0]

  expect(cursorResult.savings).toBeGreaterThan(0)
  expect(cursorResult.recommendedAction).toContain('Downgrade')
})

// Test 2 — Cursor Pro with correct usage should be optimal
test('Cursor Pro for coding team is optimal', () => {
  const tools: Tool[] = [
    { name: 'cursor', plan: 'pro', seats: 1, monthlySpend: 20 }
  ]
  const result = runAudit(tools, 1, 'coding')
  const cursorResult = result.results[0]

  expect(cursorResult.savings).toBe(0)
  expect(cursorResult.recommendedAction).toBe('No change needed')
})

// Test 3 — GitHub Copilot Business with 2 seats should recommend Individual
test('GitHub Copilot Business with 2 seats recommends Individual plan', () => {
  const tools: Tool[] = [
    { name: 'github_copilot', plan: 'business', seats: 2, monthlySpend: 38 }
  ]
  const result = runAudit(tools, 2, 'coding')
  const copilotResult = result.results[0]

  expect(copilotResult.savings).toBeGreaterThan(0)
  expect(copilotResult.recommendedAction).toContain('Individual')
})

// Test 4 — Claude Team with 2 seats should recommend Pro
test('Claude Team with 2 seats recommends Pro plan', () => {
  const tools: Tool[] = [
    { name: 'claude', plan: 'team', seats: 2, monthlySpend: 60 }
  ]
  const result = runAudit(tools, 2, 'writing')
  const claudeResult = result.results[0]

  expect(claudeResult.savings).toBeGreaterThan(0)
  expect(claudeResult.recommendedAction).toContain('Pro')
})

// Test 5 — Total savings adds up correctly across multiple tools
test('Total monthly savings is sum of all tool savings', () => {
  const tools: Tool[] = [
    { name: 'cursor', plan: 'business', seats: 2, monthlySpend: 80 },
    { name: 'github_copilot', plan: 'business', seats: 2, monthlySpend: 38 }
  ]
  const result = runAudit(tools, 2, 'coding')

  const manualTotal = result.results.reduce((sum, r) => sum + r.savings, 0)
  expect(result.totalMonthlySavings).toBe(manualTotal)
})

// Test 6 — Annual savings is exactly 12x monthly
test('Annual savings is 12 times monthly savings', () => {
  const tools: Tool[] = [
    { name: 'cursor', plan: 'business', seats: 3, monthlySpend: 120 }
  ]
  const result = runAudit(tools, 3, 'coding')

  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
})

// Test 7 — Zero savings when all tools are optimal
test('Returns zero savings when all tools are optimal', () => {
  const tools: Tool[] = [
    { name: 'cursor', plan: 'pro', seats: 1, monthlySpend: 20 }
  ]
  const result = runAudit(tools, 1, 'coding')

  expect(result.totalMonthlySavings).toBe(0)
  expect(result.totalAnnualSavings).toBe(0)
})