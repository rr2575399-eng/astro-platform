import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { insert, select, update } from "@/lib/server/db";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  const event = JSON.parse(raw) as Record<string, any>;
  const eventId = req.headers.get("x-razorpay-event-id") || crypto.createHash("sha256").update(raw).digest("hex");
  try { await insert("webhook_events", { provider: "razorpay", event_id: eventId, event_type: event.event, payload: event }); }
  catch { return NextResponse.json({ ok: true, duplicate: true }); }
  if (event.event === "payment.captured" || event.event === "order.paid") {
    const gatewayOrderId = event.payload?.payment?.entity?.order_id || event.payload?.order?.entity?.id;
    const paymentId = event.payload?.payment?.entity?.id || null;
    if (gatewayOrderId) {
      const rows = await select("orders", { gateway_order_id: gatewayOrderId }, 1);
      const order = rows[0];
      if (order && order.payment_status !== "PAID") {
        await update("orders", { id: String(order.id) }, { payment_status: "PAID", status: "CALCULATION_PENDING", gateway_payment_id: paymentId, updated_at: new Date().toISOString() });
        await insert("payments", { order_id: order.id, gateway: "razorpay", gateway_order_id: gatewayOrderId, gateway_payment_id: paymentId, amount_inr: order.amount_inr, status: "PAID", webhook_event_id: eventId, raw_event: event });
        await insert("job_queue", { job_type: "PROCESS_PAID_ORDER", order_id: order.id });
      }
    }
  }
  return NextResponse.json({ ok: true });
}
