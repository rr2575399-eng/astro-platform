import { select, update, insert } from "@/lib/server/db";
import { calculateChart } from "@/lib/astrology/engine";
import { generateReport } from "@/lib/ai/report";
import { buildReportHtml } from "@/lib/pdf/report-html";
import type { BirthDetailsDraft } from "@/types";

const defaultPrompt = `You are a careful Tamil astrology report writer. Use ONLY the supplied deterministic astrology calculation. Never invent planetary positions. Write clear Tamil. Treat astrology as traditional guidance, not scientific fact. Do not provide medical, legal, or guaranteed financial outcomes.`;

export async function processPaidOrder(orderId: string) {
  const orders = await select("orders", { id: orderId }, 1);
  const order = orders[0]; if (!order) throw new Error("Order not found");
  const births = await select("birth_details", { id: String(order.birth_details_id) }, 1);
  const customer = await select("customers", { id: String(order.customer_id) }, 1);
  if (!births[0] || !customer[0]) throw new Error("Order data incomplete");

  const b = births[0];
  const birth: BirthDetailsDraft = { dob: String(b.dob), birthTime: b.birth_time ? String(b.birth_time).slice(0,5) : "", timeUnknown: Boolean(b.time_unknown), birthPlace: String(b.birth_place), birthCountry: String(b.birth_country), latitude: b.latitude ? String(b.latitude) : "", longitude: b.longitude ? String(b.longitude) : "", timeZone: String(b.time_zone) };
  const chart = await calculateChart(birth);
  await insert("astrology_calculations", { order_id: order.id, engine: process.env.ASTROLOGY_API_URL ? "external-api" : "not-configured", engine_version: "1", input_json: birth, result_json: chart });
  await update("orders", { id: String(order.id) }, { status: "AI_REPORT_PENDING", updated_at: new Date().toISOString() });

  const report = await generateReport({ customer: customer[0], birthDetails: birth, astrology: chart, serviceSlug: order.service_slug, questions: order.questions }, defaultPrompt);
  const saved = await insert("ai_reports", { order_id: order.id, prompt_version: 1, model: report.model, input_json: { birthDetails: birth, astrology: chart, serviceSlug: order.service_slug }, output_text: report.text });
  await update("orders", { id: String(order.id) }, { report_id: saved.id, status: "AI_REPORT_COMPLETED", updated_at: new Date().toISOString() });

  // Phase 7 adapter: returns printable HTML until a PDF renderer/storage provider is configured.
  const html = buildReportHtml("ஜாதகம் AI அறிக்கை", String(customer[0].full_name), report.text, String(order.order_number));
  if (process.env.PDF_SERVICE_URL) {
    const pdfRes = await fetch(process.env.PDF_SERVICE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ html }) });
    if (!pdfRes.ok) throw new Error("PDF service failed");
    // Store returned PDF in your configured object storage in the next adapter step.
  }
  await update("orders", { id: String(order.id) }, { status: "PDF_PENDING", updated_at: new Date().toISOString() });
  return { orderId, html };
}
