# Prompts

## AI Summary Prompt

This prompt is used in `app/api/summary/route.ts` to generate a personalized
~100-word audit summary for each user.

### Final prompt used in production


### Why I wrote it this way

1. **Role assignment at the start** — "You are an AI spend analyst" grounds the
model in the right persona. Without this, the model tends to give generic advice
rather than specific financial recommendations.

2. **Structured data injection** — injecting the actual tool names, plans, and
savings numbers forces the model to be specific rather than generic. Early
versions without this data produced summaries like "you may be overspending"
with no specifics.

3. **One paragraph constraint** — without this constraint, the model defaults to
bullet points. The brief required a paragraph. Adding "Write one clear paragraph
only" fixed this immediately.

4. **Actionable next step** — ending with a concrete action increases the chance
the user does something after reading. "Review your tools" is too vague.
"Downgrade Cursor from Business to Pro today and save $40 this month" is
actionable.

---

## What I tried that did not work

### Version 1 — too vague

Result: Generic output with no specific numbers. The model ignored the tool
data and gave advice like "consider whether you need all these tools."

### Version 2 — too long output

Result: 400+ word essays that were too long to display in the UI and took
5+ seconds to generate.

### Version 3 — missing persona

Result: Technically correct but bland. Adding the "AI spend analyst" persona
dramatically improved the tone and specificity.

---

## Fallback behavior

If the Gemini API fails for any reason (rate limit, network error, invalid
response), the app falls back to this templated summary:

This ensures the results page always shows something useful even when the
AI API is unavailable.

---

## Model used

- Primary: Gemini 1.5 Flash (via Google Generative Language API)
- Attempted: Anthropic Claude (no paid API access at time of submission)
- The prompt is model-agnostic and would work identically with Claude or GPT-4

