import Link from "next/link";
import { AstrologyService } from "@/types";

export default function ServiceCard({ service }: { service: AstrologyService }) {
  const discountPct = service.discountPrice
    ? Math.round(100 - (service.discountPrice / service.price) * 100)
    : 0;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {service.popular && (
        <span
          className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold text-[var(--color-night-950)]"
          style={{ background: "var(--color-gold-500)" }}
        >
          பிரபலமானது
        </span>
      )}

      <h3 className="font-display text-xl text-[var(--color-night-900)]">{service.nameTa}</h3>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-[var(--color-night-800)]/50">
        {service.nameEn}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-night-800)]/80">
        {service.shortDescriptionTa}
      </p>

      <div className="mt-5 flex items-end justify-between">
        <div>
          {service.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl" style={{ color: "var(--color-kumkum-600)" }}>
                ₹{service.discountPrice}
              </span>
              <span className="text-sm text-[var(--color-night-800)]/40 line-through">
                ₹{service.price}
              </span>
              <span className="text-xs font-semibold" style={{ color: "var(--color-gold-600)" }}>
                {discountPct}% தள்ளுபடி
              </span>
            </div>
          ) : (
            <span className="font-display text-2xl">₹{service.price}</span>
          )}
          <p className="mt-1 text-xs text-[var(--color-night-800)]/55">
            {service.deliveryHours} மணி நேரத்தில் • {service.pageCount}
          </p>
        </div>
        <span
          className="grid h-9 w-9 place-items-center rounded-full text-lg transition-transform group-hover:translate-x-1"
          style={{ background: "var(--color-paper-dim)" }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
