# Tests

All tests are in `__tests__/auditEngine.test.ts`.

## How to run

npm test

## Test coverage

| Test | What it covers |
|------|---------------|
| Cursor Business 2 seats | Recommends downgrade to Pro, savings > 0 |
| Cursor Pro coding | Already optimal, savings = 0 |
| Copilot Business 2 seats | Recommends Individual plan |
| Claude Team 2 seats | Recommends Pro plan |
| Total savings calculation | Sum of all tool savings is correct |
| Annual savings calculation | Annual = monthly x 12 |
| Zero savings when optimal | Returns 0 when all tools are correct |