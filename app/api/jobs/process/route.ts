import { NextResponse } from "next/server";
import { select, update } from "@/lib/server/db";
import { processPaidOrder } from "@/lib/jobs/process-order";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const jobSecret = process.env.JOB_SECRET;
    const cronSecret = process.env.CRON__SECRET;

    if (!jobSecret && !cronSecret) {
      return NextResponse.json(
        {
          ok: false,
          error: "JOB_SECRET or CRON_SECRET is not configured",
        },
        { status: 500 }
      );
    }

    const requestJobSecret = req.headers.get("x-job-secret");
    const authorization = req.headers.get("authorization");

    const validJobSecret =
      !!jobSecret && requestJobSecret === jobSecret;

    const validCronSecret =
      !!cronSecret &&
      authorization === `Bearer ${cronSecret}`;

    if (!validJobSecret && !validCronSecret) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // 2. Read request body
    let body: { limit?: number } = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const limit =
      Number.isFinite(Number(body.limit)) &&
      Number(body.limit) > 0
        ? Math.min(Number(body.limit), 10)
        : 1;

    // 3. Find pending jobs
    const jobs = await select(
      "job_queue",
      {
        status: "PENDING",
      },
      limit
    );

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({
        ok: true,
        processed: false,
        message: "No pending jobs found",
      });
    }

    let processedCount = 0;
    const results: unknown[] = [];

    // 4. Process jobs
    for (const job of jobs) {
      const jobId = String(job.id);
      const orderId = String(job.order_id);

      try {
        // Mark RUNNING
        await update(
          "job_queue",
          { id: jobId },
          {
            status: "RUNNING",
            attempts: Number(job.attempts ?? 0) + 1,
            error_message: null,
          }
        );

        // Main astrology processing
        await processPaidOrder(orderId);

        // Mark DONE
        await update(
          "job_queue",
          { id: jobId },
          {
            status: "DONE",
            processed_at: new Date().toISOString(),
            error_message: null,
          }
        );

        processedCount++;

        results.push({
          jobId,
          orderId,
          status: "DONE",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : String(error);

        console.error(
          "JOB PROCESSING ERROR:",
          error
        );

        // Retry later
        await update(
          "job_queue",
          { id: jobId },
          {
            status: "PENDING",
            error_message: errorMessage,
          }
        );

        results.push({
          jobId,
          orderId,
          status: "FAILED",
          error: errorMessage,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: processedCount > 0,
      processedCount,
      results,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    console.error(
      "JOBS PROCESS ROUTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}