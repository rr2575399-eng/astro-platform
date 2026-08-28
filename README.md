# ஜாதகம் AI — AI Astrology Platform

Full-stack Tamil/English AI astrology report business. Built in phases per the
master spec; **this repo currently contains Phase 1 only.**

## Current implementation status

This upgraded archive moves the project beyond the original Phase 1 UI and adds the server-side foundations for the production pipeline:

- PostgreSQL/Supabase schema in `database/schema.sql`
- Server-side order creation at `/api/orders`
- Razorpay order creation at `/api/payments/create`
- Razorpay webhook signature verification at `/api/payments/webhook`
- Webhook-driven PAID state; the browser cannot mark an order paid
- Database-backed job queue and protected worker endpoint at `/api/jobs/process`
- Deterministic astrology provider adapter in `lib/astrology/engine.ts`
- AI report adapter in `lib/ai/report.ts`
- Printable Tamil HTML report generator in `lib/pdf/report-html.ts`
- Official WhatsApp Cloud API document adapter in `lib/whatsapp/client.ts`
- Real order tracking page connected to `/api/orders/[id]`
- Mobile order form now creates a real order and opens Razorpay checkout when credentials are configured

### What still requires an external provider/configuration

The code deliberately does **not** fake these services. Before taking real orders, configure a deterministic astrology provider, AI provider, payment account/webhook, PDF renderer/storage, WhatsApp Business API, and a trusted cron/worker for `/api/jobs/process`. The PDF adapter currently produces print-ready HTML; set `PDF_SERVICE_URL` to a real HTML-to-PDF service and add object storage before enabling automatic WhatsApp PDF delivery.

## Setup

```bash
npm install
cp .env.example .env.local
# Run database/schema.sql in Supabase SQL Editor
npm run dev
```

Required production environment variables are documented in `.env.example`. Never commit `.env.local` or server secrets.

## Order pipeline

```text
Customer
  ↓
POST /api/orders
  ↓
Razorpay checkout
  ↓
Razorpay webhook (server verified)
  ↓
orders.payment_status = PAID
  ↓
job_queue
  ↓
astrology provider
  ↓
AI report
  ↓
PDF renderer + storage
  ↓
WhatsApp Cloud API
  ↓
Customer
```

The webhook is the source of truth for payment. Do not change the order to `PAID` from browser JavaScript.

## Database

Run `database/schema.sql` in your PostgreSQL/Supabase project. The schema includes customers, birth details, orders, payments, webhook events, deterministic astrology results, AI reports and a retryable job queue.

## Worker

Configure a trusted cron/worker to POST to `/api/jobs/process` with `x-job-secret: <JOB_SECRET>`. For production, replace the simple one-row polling worker with a proper queue/locking strategy or managed job system when volume grows.

## Important safety/business rules

- Do not let an LLM calculate planetary positions.
- Do not promise guaranteed marriage, wealth, jobs, health cures or investment returns.
- Treat birth information and phone numbers as personal data.
- Use only official/authorized WhatsApp Business APIs.
- Verify payment webhooks server-side and make event processing idempotent.
- Have the legal/refund/privacy pages reviewed for your actual business and jurisdiction before launch.

## Content notes

- All astrology copy avoids guaranteed-outcome language (marriage, health,
  wealth, government jobs) per the spec's compliance requirements — every
  service detail page carries a disclaimer, and the four legal pages set
  expectations up front.
- Tamil is the primary language throughout; English is used for brand/technical
  terms (service names, "Order ID") where that's how Tamil users actually
  encounter this domain online.
