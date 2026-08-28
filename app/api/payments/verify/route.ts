import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { select, update, insert } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderNumber,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Payment details missing" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Razorpay secret not configured" },
        { status: 503 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (
      expectedSignature.length !== razorpay_signature.length ||
      !crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature)
      )
    ) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 401 }
      );
    }

    const rows = await select(
      "orders",
      { gateway_order_id: razorpay_order_id },
      1
    );

    const order = rows[0];

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    await update(
      "orders",
      { id: String(order.id) },
      {
        payment_status: "PAID",
        status: "CALCULATION_PENDING",
        gateway_payment_id: razorpay_payment_id,
        updated_at: new Date().toISOString(),
      }
    );

    await insert("payments", {
      order_id: order.id,
      gateway: "razorpay",
      gateway_order_id: razorpay_order_id,
      gateway_payment_id: razorpay_payment_id,
      amount_inr: order.amount_inr,
      status: "PAID",
      raw_event: {
        source: "razorpay_checkout",
        orderNumber,
      },
    });

    return NextResponse.json({
      ok: true,
      orderNumber: order.order_number,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}