import { NextResponse } from "next/server";
import { select, update } from "@/lib/server/db";
import { processPaidOrder } from "@/lib/jobs/process-order";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.JOB_SECRET;
  if (!secret || req.headers.get("x-job-secret") !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const jobs = await select("job_queue", { status: "PENDING" }, 1);
  const job = jobs[0]; if (!job) return NextResponse.json({ processed: false });
  await update("job_queue", { id: String(job.id) }, { status: "RUNNING", attempts: Number(job.attempts) + 1, locked_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  try {
    await processPaidOrder(String(job.order_id));
    await update("job_queue", { id: String(job.id) }, { status: "DONE", updated_at: new Date().toISOString() });
    return NextResponse.json({ processed: true, orderId: job.order_id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await update("job_queue", { id: String(job.id) }, { status: "PENDING", last_error: message, updated_at: new Date().toISOString() });
    return NextResponse.json({ processed: false, error: message }, { status: 500 });
  }
}
