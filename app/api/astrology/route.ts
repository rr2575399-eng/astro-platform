import { NextResponse } from "next/server";
import { calculateChart } from "@/lib/astrology/engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const birthDetails = {
      dob: String(body.date),
      birthTime: String(body.time),
      timeUnknown: false,
      birthPlace: String(body.birthPlace ?? "Thanjavur"),
      birthCountry: "India",
      latitude: String(body.latitude),
      longitude: String(body.longitude),
      timeZone: String(body.timezone ?? "Asia/Kolkata"),
    };

    const chart = await calculateChart(birthDetails);

    return NextResponse.json({
      success: true,
      birthDetails,
      chart,
    });
  } catch (error) {
    console.error("ASTROLOGY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error
          ? error.message
          : "Astrology calculation failed",
      },
      { status: 500 }
    );
  }
}