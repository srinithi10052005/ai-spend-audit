# Metrics

## North Star Metric

**Audits completed per week**

This is the right North Star for this stage because every downstream
outcome — leads captured, consultations booked, credits sold — flows
from a completed audit. A user who completes an audit has seen value.
A user who bounces on the form has not.

We do not use "visitors" because traffic without completion means
nothing. We do not use "leads captured" because that optimizes for
the email gate, not the value delivery. Audits completed is the
metric that best represents "did this person get value from the tool."

---

## 3 Input Metrics

### 1. Form completion rate
**Definition:** Percentage of visitors who click "Run my audit" after
landing on the page.
**Why it matters:** This measures whether the landing page convinces
people to engage. A low form completion rate means the copy is unclear,
the form is too long, or the value proposition is not landing.
**Target:** 40% of visitors who stay past 10 seconds complete the audit.

### 2. Email capture rate
**Definition:** Percentage of completed audits where the user submits
their email.
**Why it matters:** This is the conversion from value delivery to lead.
If people complete the audit but do not give their email, either the
savings shown are too low to motivate action or the email ask feels
too aggressive.
**Target:** 20% of completed audits result in an email capture.

### 3. Share rate
**Definition:** Percentage of completed audits where the user copies
the shareable URL.
**Why it matters:** Shares are the viral loop. Each shared audit URL
brings new visitors who run their own audit. A high share rate means
the results page is compelling enough to show others.
**Target:** 5% of completed audits result in a shared URL being copied.

---

## What I would instrument first

On day 1 of launch I would add these 5 events to a simple analytics
tool like Plausible or PostHog:

1. `audit_started` — user clicks Run my audit
2. `audit_completed` — results page renders successfully
3. `email_submitted` — user submits email in lead capture form
4. `share_link_copied` — user clicks Copy link button
5. `consultation_clicked` — user clicks Book a Credex consultation

These 5 events cover the entire funnel. Everything else can wait.

I would not instrument page views, scroll depth, or time on page at
this stage. Those metrics are interesting but do not drive decisions
for an MVP. The 5 events above tell me everything I need to know about
whether the funnel is working.

---

## What number triggers a pivot decision

If after 500 completed audits:

**Form completion rate below 20%** → the landing page is not working.
Pivot: rewrite the hero copy, simplify the form, or add a demo video
showing what the results look like before users commit to filling it in.

**Email capture rate below 10%** → the results are not compelling enough
to motivate action. Pivot: either the savings numbers are too low
(improve the audit engine rules) or the email ask feels too pushy
(test showing it after a delay or making it more optional).

**Zero consultation clicks after 50 leads** → the Credex CTA is not
landing. Pivot: change the positioning from "book a consultation" to
"see what Credex credits would save you" — lower commitment, same
intent signal.

**Share rate below 1%** → the results page is not shareable. Pivot:
redesign the Open Graph preview to show the savings number more
prominently, or add a one-click tweet button with pre-filled copy.

---

## Metrics that do not matter at this stage

- **DAU / MAU** — this is a tool people use once per quarter when they
  review their subscriptions. Daily active users is the wrong frame.
  A user who comes back once a quarter and runs a new audit is a
  successful retained user.

- **Session duration** — we want users to get value fast and leave.
  Long session duration means the tool is confusing, not engaging.

- **Bounce rate** — too noisy for a single-page tool. Use form
  completion rate instead which measures the same intent more precisely.