import { NextResponse } from "next/server";
import { select, update } from "@/lib/server/db";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json() as { orderId: string };
    const rows = await select("orders", { id: orderId }, 1);
    const order = rows[0];
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    const key = process.env.RAZORPAY_KEY_ID, secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key || !secret) { return NextResponse.json({ error: "Payment gateway is not configured" }, { status: 503 });}
    const auth = Buffer.from(`${key}:${secret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(order.amount_inr) * 100, currency: "INR", receipt: String(order.order_number), notes: { order_id: String(order.id) } }),
    });
    if (!res.ok) return NextResponse.json({ error: "Payment provider rejected the order" }, { status: 502 });
    const paymentOrder = await res.json();
    await update("orders", { id: String(order.id) }, { gateway_order_id: paymentOrder.id, payment_status: "PENDING", updated_at: new Date().toISOString() });
    return NextResponse.json({ keyId: key, gatewayOrderId: paymentOrder.id, amount: paymentOrder.amount, currency: paymentOrder.currency, orderNumber: order.order_number });
  } catch (error) {
    console.error(error); return NextResponse.json({ error: "Unable to create payment" }, { status: 500 });
  }
}
