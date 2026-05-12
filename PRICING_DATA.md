# Pricing Data

All prices verified during submission week (May 2026).
Every number in the audit engine traces to an official vendor pricing page.

---

## Cursor
- Hobby: $0/month — https://cursor.com/pricing — verified 2026-05-12
- Pro: $20/user/month — https://cursor.com/pricing — verified 2026-05-12
- Business: $40/user/month — https://cursor.com/pricing — verified 2026-05-12
- Enterprise: Custom pricing — https://cursor.com/pricing — verified 2026-05-12

---

## GitHub Copilot
- Individual: $10/user/month — https://github.com/features/copilot#pricing — verified 2026-05-12
- Business: $19/user/month — https://github.com/features/copilot#pricing — verified 2026-05-12
- Enterprise: $39/user/month — https://github.com/features/copilot#pricing — verified 2026-05-12

---

## Claude (Anthropic)
- Free: $0/month — https://www.anthropic.com/claude/pricing — verified 2026-05-12
- Pro: $20/user/month — https://www.anthropic.com/claude/pricing — verified 2026-05-12
- Max: $100/user/month — https://www.anthropic.com/claude/pricing — verified 2026-05-12
- Team: $30/user/month (minimum 5 seats) — https://www.anthropic.com/claude/pricing — verified 2026-05-12
- Enterprise: Custom pricing — https://www.anthropic.com/claude/pricing — verified 2026-05-12

---

## ChatGPT (OpenAI)
- Plus: $20/user/month — https://openai.com/chatgpt/pricing — verified 2026-05-12
- Team: $30/user/month (minimum 2 seats) — https://openai.com/chatgpt/pricing — verified 2026-05-12
- Enterprise: Custom pricing — https://openai.com/chatgpt/pricing — verified 2026-05-12

---

## Anthropic API (Direct)
- Pay as you go — no monthly fee
- Claude Sonnet 4: $3/million input tokens, $15/million output tokens — https://www.anthropic.com/pricing — verified 2026-05-12
- Claude Haiku: $0.80/million input tokens, $4/million output tokens — https://www.anthropic.com/pricing — verified 2026-05-12

---

## OpenAI API (Direct)
- Pay as you go — no monthly fee
- GPT-4o: $2.50/million input tokens, $10/million output tokens — https://openai.com/api/pricing — verified 2026-05-12
- GPT-4o mini: $0.15/million input tokens, $0.60/million output tokens — https://openai.com/api/pricing — verified 2026-05-12

---

## Gemini (Google)
- Gemini Pro: $20/user/month — https://one.google.com/about/plans — verified 2026-05-12
- Gemini Ultra: $30/user/month — https://one.google.com/about/plans — verified 2026-05-12
- Gemini 1.5 Flash API: Free tier available, $0.075/million input tokens paid — https://ai.google.dev/pricing — verified 2026-05-12

---

## Windsurf (Codeium)
- Free: $0/month — https://windsurf.com/pricing — verified 2026-05-12
- Pro: $15/user/month — https://windsurf.com/pricing — verified 2026-05-12
- Teams: $35/user/month — https://windsurf.com/pricing — verified 2026-05-12

---

## Audit Engine Price Justifications

### Cursor Business to Pro downgrade
- Business: $40/seat/month
- Pro: $20/seat/month
- Saving per seat: $20/month
- Trigger: Business plan with 2 or fewer seats
- Reasoning: Business plan adds admin controls and SSO not needed for small teams.
- Source: https://cursor.com/pricing

### GitHub Copilot Business to Individual downgrade
- Business: $19/seat/month
- Individual: $10/seat/month
- Saving per seat: $9/month
- Trigger: Business plan with 3 or fewer seats
- Reasoning: Business adds org-wide policy management not needed for small teams.
- Source: https://github.com/features/copilot#pricing

### Claude Team to Pro downgrade
- Team: $30/seat/month — 5 seat minimum
- Pro: $20/seat/month
- Trigger: Team plan with 2 or fewer seats
- Reasoning: Team plan forces 5 seat minimum. 2-person team pays for 3 unused seats.
- Source: https://www.anthropic.com/claude/pricing

### ChatGPT Team to Plus downgrade
- Team: $30/seat/month
- Plus: $20/seat/month
- Saving per seat: $10/month
- Trigger: Team plan with 2 or fewer seats
- Reasoning: Team adds shared workspaces not needed for very small teams.
- Source: https://openai.com/chatgpt/pricing