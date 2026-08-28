import { NextResponse } from "next/server";
import { select } from "@/lib/server/db";
export const runtime = "nodejs";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rows = await select("orders", { order_number: id }, 1);
    if (!rows[0]) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order: rows[0] });
  } catch { return NextResponse.json({ error: "Unable to fetch order" }, { status: 500 }); }
}
