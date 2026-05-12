# AI Spend Audit

A free web app that audits your AI tool spend and tells you exactly where you're overpaying — instant, no login required.

Built as a lead generation tool for [Credex](https://credex.rocks) — a platform that sells discounted AI infrastructure credits.

**Live URL:** https://ai-spend-audit-rust-psi.vercel.app

---

## Screenshots

> Add 3 screenshots here — paste images of:
> 1. The input form
> 2. The results page showing savings
> 3. The email capture form

---

## Who it's for

Startup founders and engineering managers who pay monthly for AI tools like Cursor, Claude, ChatGPT, and GitHub Copilot — and have no idea if they're overpaying.

---

## Quick start

### Run locally

```bash
git clone https://github.com/srinithi10052005/ai-spend-audit.git
cd ai-spend-audit
npm install
cp .env.local.example .env.local
# Fill in your keys in .env.local
npm run dev
```

Open http://localhost:3000

### Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### Deploy

Push to GitHub — Vercel auto-deploys on every push to main.

---

## Decisions

1. **Next.js over plain React** — App Router gives us server-side rendering for the shareable audit pages, which is important for Open Graph previews and SEO. A plain React SPA would require a separate server for this.

2. **Hardcoded rules over AI for audit logic** — The brief explicitly said knowing when not to use AI is part of the test. A finance person needs to read the reasoning and agree with it. Hardcoded rules with clear number-based justifications are more defensible than LLM outputs for this use case.

3. **Supabase over Firebase** — Supabase gives us a Postgres database with a simple REST API and a generous free tier. It also has a good dashboard for viewing leads, which matters for Credex's sales team.

4. **Gemini API over Anthropic API** — Attempted to use Anthropic API but did not have paid access at the time of submission. Gemini 1.5 Flash provides the same summarization capability with a free tier. The prompt and fallback logic are identical.

5. **Email capture after results, never before** — The brief was explicit: show value first, capture email after. Putting the email gate before the audit would kill conversion. Users who have already seen their savings are far more likely to share their email.

---

## Built with

- Next.js 15 + TypeScript
- Tailwind CSS
- Supabase (database)
- Gemini API (AI summary)
- Resend (transactional email)
- Vercel (deployment)