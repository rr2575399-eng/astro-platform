// ============================================================================
// PAYMENT INTEGRATION POINT — NOT YET IMPLEMENTED (Phase 3 of the build plan)
// ============================================================================
// This file intentionally contains NO real payment gateway calls. Per the
// project's phased approach, Phase 1 ships the order form UI only.
//
// When Phase 3 is built, this function will:
//   1. Create a server-side order with the payment gateway
//      (e.g. Razorpay Orders API) using PAYMENT_KEY_ID / PAYMENT_KEY_SECRET
//      from environment variables — NEVER from client-side code.
//   2. Return a gateway order/session id to the client so the checkout
//      widget can be opened.
//   3. A separate webhook route (/api/payments/webhook) verified with
//      PAYMENT_WEBHOOK_SECRET will be the ONLY thing allowed to mark an
//      order as PAID — frontend confirmation is never trusted.
//
// Required environment variables (see .env.example):
//   PAYMENT_KEY_ID
//   PAYMENT_KEY_SECRET
//   PAYMENT_WEBHOOK_SECRET
//
// Until those are configured and this module is implemented against a real
// gateway, calling this function throws on purpose so the UI can show an
// honest "checkout isn't live yet" state instead of a fake success screen.
// ============================================================================

import { OrderDraft } from "@/types";

export interface CreatePaymentResult {
  gatewayOrderId: string;
  amount: number;
  currency: "INR";
}

export async function createPaymentOrder(
  _order: OrderDraft,
  _amount: number
): Promise<CreatePaymentResult> {
  throw new Error(
    "Payment gateway is not connected yet. This is a Phase 1 build " +
      "(landing page + services + order form only). Wire up a real gateway " +
      "here in Phase 3 — see the comment block at the top of this file."
  );
}
