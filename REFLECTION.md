# Reflection

## 1. The hardest bug I hit this week

The hardest bug was the JSX dollar sign parsing error that kept breaking the
build. The error message was "Unexpected token. Did you mean `{'>'}` or
`&gt;`?" which pointed to a line with a dollar sign inside JSX like:

```tsx
Moving the file to `app/audit/[id]/page.tsx` fixed the build immediately.
The lesson was to read the Next.js App Router documentation more carefully
before deciding on folder structure — the convention is strict and not
flexible.

---

## 3. What I would build in week 2

If I had a second week I would focus on three things:

**First, fix the AI summary.** The Gemini API is currently returning empty
responses in some cases and falling back to a templated summary. I would
debug the prompt, add better error logging, and potentially switch to the
Anthropic API once I have paid access. The AI summary is the most
differentiating feature and it needs to work reliably.

**Second, expand the audit engine rules.** Currently the engine only catches
5 specific scenarios. A real audit tool needs 20-30 rules covering more
tools, more plan combinations, and usage-based recommendations. I would
add rules for Windsurf, Gemini API usage, and cross-tool recommendations
like "you have both Cursor and GitHub Copilot — for a coding team this size,
Cursor alone covers everything Copilot does."

**Third, build the benchmark mode.** "Your AI spend per developer is $X —
companies your size average $Y" is the most viral feature because it gives
users a reason to share the tool even when their own savings are low. I
would collect anonymized spend data from audits and build a simple benchmark
against industry averages.

---

## 4. How I used AI tools

I used Claude (claude.ai) as my primary development assistant throughout the
week. Specifically I used it for:

**Code generation** — generating boilerplate for Next.js API routes, Supabase
queries, and React components. Claude was fast at producing working code for
patterns I already understood but did not want to type out.

**Debugging** — pasting error messages and getting explanations. This was
genuinely useful for the JSX dollar sign bug and the Next.js params Promise
issue which were both framework-specific gotchas I had not seen before.

**Documentation** — helping structure the markdown files. I wrote the content
but used Claude to help organize it into the right format.

**What I did not trust AI with** — the audit engine logic. The reasoning
behind each recommendation needs to be financially defensible and traceable
to real pricing pages. I wrote every rule myself after manually checking
vendor pricing pages. An AI-generated rule might sound plausible but be
based on outdated or incorrect pricing data.

**One time the AI was wrong** — Claude suggested putting the shareable audit
page at `app/api/audit/[id]/page.tsx`. This caused a build failure because
pages cannot live inside the api folder in Next.js App Router. I caught this
when the Vercel build failed and fixed it by moving the file to the correct
location at `app/audit/[id]/page.tsx`.

---

## 5. Self-ratings

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Discipline | 6/10 | Committed every day but some days were reactive — fixing bugs rather than building planned features. Should have planned the folder structure more carefully on Day 1. |
| Code quality | 6/10 | The core logic is clean and well-typed but I had to disable ESLint during builds to meet the deadline. The any types in the API routes should be properly typed. |
| Design sense | 7/10 | The UI is clean and minimal — black hero card, clear hierarchy, good use of whitespace. The font visibility issue on inputs was a miss that took too long to fix. |
| Problem solving | 7/10 | Debugged all build errors and got the site live. The JSX dollar sign bug and the params Promise issue required real investigation. Could have been faster with better upfront research. |
| Entrepreneurial thinking | 6/10 | Understood the lead generation mechanic and built the email capture correctly — value first, email after. The GTM and economics thinking is solid. Should have done user interviews earlier in the week rather than Day 6. |