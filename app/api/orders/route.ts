import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/data/services";
import { insert } from "@/lib/server/db";
import { newOrderNumber } from "@/lib/server/order-number";
import type { OrderDraft } from "@/types";

export const runtime = "nodejs";

function validPhone(value: string) {
  return /^\d{10}$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderDraft;

    const service = body.serviceSlug
      ? getServiceBySlug(body.serviceSlug)
      : undefined;

    if (!service || !body.consentGiven) {
      return NextResponse.json(
        { error: "Invalid order details" },
        { status: 400 }
      );
    }

    if (
      !body.customer.fullName?.trim() ||
      !validPhone(body.customer.mobile)
    ) {
      return NextResponse.json(
        { error: "Invalid customer details" },
        { status: 400 }
      );
    }

    if (
      !body.birthDetails.dob ||
      !body.birthDetails.birthPlace?.trim()
    ) {
      return NextResponse.json(
        { error: "Invalid birth details" },
        { status: 400 }
      );
    }

    if (
      !body.birthDetails.timeUnknown &&
      !body.birthDetails.birthTime
    ) {
      return NextResponse.json(
        {
          error:
            "Birth time is required unless marked unknown",
        },
        { status: 400 }
      );
    }

    const customer = await insert("customers", {
      full_name: body.customer.fullName.trim(),
      gender: body.customer.gender,
      mobile: body.customer.mobile,
      whatsapp: body.customer.sameAsMobile
        ? body.customer.mobile
        : body.customer.whatsapp,
      email: body.customer.email || null,
    });

    const birth = await insert("birth_details", {
      customer_id: customer.id,
      dob: body.birthDetails.dob,
      birth_time: body.birthDetails.timeUnknown
        ? null
        : body.birthDetails.birthTime,
      time_unknown: body.birthDetails.timeUnknown,
      birth_place: body.birthDetails.birthPlace.trim(),
      birth_country: body.birthDetails.birthCountry || "India",
      latitude: body.birthDetails.latitude
        ? Number(body.birthDetails.latitude)
        : null,
      longitude: body.birthDetails.longitude
        ? Number(body.birthDetails.longitude)
        : null,
      time_zone: body.birthDetails.timeZone || "+05:30",
    });

    const amount = service.discountPrice ?? service.price;

    const order = await insert("orders", {
      order_number: newOrderNumber(),
      customer_id: customer.id,
      birth_details_id: birth.id,
      service_slug: service.slug,
      amount_inr: amount,
      currency: "INR",
      questions: body.questions || null,
      consent_given: true,
      status: "PAYMENT_PENDING",
      payment_status: "CREATED",
    });

    return NextResponse.json(
      {
        orderId: order.id,
        orderNumber: order.order_number,
        amount,
        currency: "INR",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}