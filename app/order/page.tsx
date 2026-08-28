import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/data/services";
import { ReportSlug } from "@/types";
import OrderForm from "@/components/OrderForm";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ஜாதகம் ஆர்டர் செய்ய",
  description: "உங்கள் விவரங்களை உள்ளிட்டு ஜாதக அறிக்கையை ஆர்டர் செய்யுங்கள்.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const preselected = service && getServiceBySlug(service) ? (service as ReportSlug) : undefined;

  return (
    <><Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
          ஆர்டர் படிவம்
        </span>
        <h1 className="font-display mt-2 text-4xl text-[var(--color-night-900)]">
          உங்கள் ஜாதகத்தை ஆர்டர் செய்யுங்கள்
        </h1>
        <p className="mt-3 text-[var(--color-night-800)]/75">
          5 எளிய படிகள். உங்கள் தகவல்கள் பாதுகாப்பாக வைக்கப்படும்.
        </p>
      </div>

      <OrderForm preselectedService={preselected} />
    </div></>
  );
}
