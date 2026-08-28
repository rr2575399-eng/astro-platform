"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { OrderStatus } from "@/types";

// Metadata is intentionally omitted here because this is a client component.
const stages: Array<{ key: OrderStatus | "PAYMENT_PENDING"; label: string; match: string[] }> = [
  { key: "ORDER_CREATED", label: "ஆர்டர் உருவாக்கப்பட்டது", match: ["ORDER_CREATED", "PAYMENT_PENDING"] },
  { key: "PAYMENT_SUCCESS", label: "கட்டணம் வெற்றி", match: ["PAYMENT_SUCCESS", "CALCULATION_PENDING", "CALCULATION_COMPLETED", "AI_REPORT_PENDING", "AI_REPORT_COMPLETED", "PDF_PENDING", "PDF_COMPLETED", "WHATSAPP_PENDING", "WHATSAPP_SENT", "COMPLETED"] },
  { key: "CALCULATION_COMPLETED", label: "ஜோதிட கணக்கீடு", match: ["CALCULATION_COMPLETED", "AI_REPORT_PENDING", "AI_REPORT_COMPLETED", "PDF_PENDING", "PDF_COMPLETED", "WHATSAPP_PENDING", "WHATSAPP_SENT", "COMPLETED"] },
  { key: "AI_REPORT_COMPLETED", label: "அறிக்கை தயாரிப்பு", match: ["AI_REPORT_COMPLETED", "PDF_PENDING", "PDF_COMPLETED", "WHATSAPP_PENDING", "WHATSAPP_SENT", "COMPLETED"] },
  { key: "PDF_COMPLETED", label: "PDF தயாரிப்பு", match: ["PDF_COMPLETED", "WHATSAPP_PENDING", "WHATSAPP_SENT", "COMPLETED"] },
  { key: "WHATSAPP_SENT", label: "WhatsApp அனுப்பப்பட்டது", match: ["WHATSAPP_SENT", "COMPLETED"] },
];

export default function OrderTrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setOrder(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ஆர்டர் கிடைக்கவில்லை");
      setOrder(data.order);
    } catch (err) { setError(err instanceof Error ? err.message : "ஆர்டர் தேட முடியவில்லை"); }
    finally { setLoading(false); }
  }

  const status = String(order?.status || "");
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>ஆர்டர் நிலை</span>
      <h1 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">உங்கள் ஆர்டர் நிலையை பார்க்கவும்</h1>
      <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm">
        <div><label htmlFor="orderId" className="block text-sm font-semibold">ஆர்டர் எண் (Order ID)</label><input required id="orderId" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="ASTRO-2026-123456" className="mt-1 w-full rounded-xl border border-night-900/15 px-4 py-3" /></div>
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-50" style={{ background: "var(--color-kumkum-600)" }}>{loading ? "தேடுகிறது..." : "நிலையை பார்க்க"}</button>
      </form>

      {order && <div className="mt-8 rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs text-black/50">Order ID</p><p className="font-bold">{String(order.order_number)}</p></div><span className="rounded-full bg-[var(--color-paper-dim)] px-3 py-1 text-xs font-semibold">{status}</span></div>
        <ol className="mt-8 space-y-4">
          {stages.map((stage, i) => { const done = stage.match.includes(status); return <li key={stage.key} className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-full border text-xs ${done ? "border-green-600 bg-green-50 text-green-700" : "border-black/15 text-black/40"}`}>{done ? "✓" : i + 1}</span><span className={done ? "font-semibold" : "text-black/45"}>{stage.label}</span></li>; })}
        </ol>
      </div>}
    </div>
  );
}
