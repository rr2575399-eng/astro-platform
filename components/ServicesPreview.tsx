import Link from "next/link";
import { getActiveServices } from "@/lib/data/services";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const featured = getActiveServices()
    .filter((s) => s.popular)
    .slice(0, 3);

  return (
    <section
      className="py-20"
      style={{ background: "var(--color-paper-dim)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
              பிரபலமான அறிக்கைகள்
            </span>
            <h2 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">
              உங்களுக்கு ஏற்ற ஜாதக அறிக்கையை தேர்வு செய்யுங்கள்
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold underline decoration-2 underline-offset-4"
            style={{ color: "var(--color-kumkum-600)" }}
          >
            அனைத்து சேவைகளையும் பார்க்க
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
