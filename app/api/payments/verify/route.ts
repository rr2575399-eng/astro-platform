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

    // -----------------------------------------
    // 1. Validate Razorpay payment data
    // -----------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Payment details missing",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // 2. Razorpay secret
    // -----------------------------------------

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        {
          ok: false,
          error: "Razorpay secret not configured",
        },
        { status: 503 }
      );
    }

    // -----------------------------------------
    // 3. Verify Razorpay signature
    // -----------------------------------------

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const expectedBuffer =
      Buffer.from(generatedSignature);

    const receivedBuffer =
      Buffer.from(razorpay_signature);

    if (
      expectedBuffer.length !==
        receivedBuffer.length ||
      !crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payment signature",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------
    // 4. Find order
    // -----------------------------------------

    const rows = await select(
      "orders",
      {
        gateway_order_id: razorpay_order_id,
      },
      1
    );

    const order = rows[0];

    if (!order) {
      return NextResponse.json(
        {
          ok: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // -----------------------------------------
    // 5. Update order as PAID
    // -----------------------------------------

    await update(
      "orders",
      {
        id: String(order.id),
      },
      {
        payment_status: "PAID",
        status: "CALCULATION_PENDING",
        gateway_payment_id:
          razorpay_payment_id,
        updated_at:
          new Date().toISOString(),
      }
    );

    // -----------------------------------------
    // 6. Create job_queue record
    // IMPORTANT: job_type is required
    // -----------------------------------------

    await insert("job_queue", {
      job_type: "ASTROLOGY_CALCULATION",
      order_id: order.id,
      status: "PENDING",
      attempts: 0,
      error_message: null,
      created_at:
        new Date().toISOString(),
      processed_at: null,
    });

    // -----------------------------------------
    // 7. Save payment
    // -----------------------------------------

    await insert("payments", {
      order_id: order.id,
      gateway: "razorpay",
      gateway_order_id:
        razorpay_order_id,
      gateway_payment_id:
        razorpay_payment_id,
      amount_inr: order.amount_inr,
      status: "PAID",
      raw_event: {
        source: "razorpay_checkout",
        orderNumber:
          orderNumber ?? null,
      },
    });

    // -----------------------------------------
    // 8. Success
    // -----------------------------------------

    return NextResponse.json({
      ok: true,
      orderNumber:
        order.order_number,
      message:
        "Payment verified and calculation job created",
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      },
      { status: 500 }
    );
  }
}