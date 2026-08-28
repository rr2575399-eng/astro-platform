import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActiveServices, getServiceBySlug } from "@/lib/data/services";
import ServiceCard from "@/components/ServiceCard";

export function generateStaticParams() {
  return getActiveServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.nameTa} (${service.nameEn})`,
    description: service.shortDescriptionTa,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getActiveServices()
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const discountPct = service.discountPrice
    ? Math.round(100 - (service.discountPrice / service.price) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-[var(--color-night-800)]/60">
        <Link href="/services" className="hover:underline">
          சேவைகள்
        </Link>{" "}
        / <span className="text-[var(--color-night-900)]">{service.nameTa}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {service.popular && (
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-bold text-[var(--color-night-950)]"
              style={{ background: "var(--color-gold-500)" }}
            >
              பிரபலமானது
            </span>
          )}
          <h1 className="font-display mt-3 text-4xl text-[var(--color-night-900)]">
            {service.nameTa}
          </h1>
          <p className="mt-1 text-sm uppercase tracking-wide text-[var(--color-night-800)]/50">
            {service.nameEn}
          </p>

          <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-night-800)]/85">
            {service.descriptionTa}
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-bold tracking-wide text-[var(--color-night-900)]">
              இந்த அறிக்கையில் அடங்கியவை
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.sections.map((section) => (
                <li key={section} className="flex items-start gap-2 text-sm text-[var(--color-night-800)]/85">
                  <span aria-hidden style={{ color: "var(--color-gold-600)" }}>✦</span>
                  {section}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-8 rounded-2xl border p-5 text-sm leading-relaxed"
            style={{ borderColor: "rgba(156,43,69,0.25)", background: "rgba(156,43,69,0.05)" }}
          >
            <strong style={{ color: "var(--color-kumkum-600)" }}>குறிப்பு:</strong>{" "}
            <span className="text-[var(--color-night-800)]/85">
              இந்த அறிக்கை பாரம்பரிய ஜோதிட நம்பிக்கைகளின் அடிப்படையில் தயாரிக்கப்படுகிறது.
              இது மருத்துவ, சட்ட அல்லது நிதி ஆலோசனைக்கு மாற்றாக கருதப்படக்கூடாது.
            </span>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          {service.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl" style={{ color: "var(--color-kumkum-600)" }}>
                ₹{service.discountPrice}
              </span>
              <span className="text-[var(--color-night-800)]/40 line-through">₹{service.price}</span>
              <span className="text-xs font-semibold" style={{ color: "var(--color-gold-600)" }}>
                {discountPct}% தள்ளுபடி
              </span>
            </div>
          ) : (
            <span className="font-display text-3xl">₹{service.price}</span>
          )}

          <dl className="mt-5 space-y-3 border-t border-night-900/8 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--color-night-800)]/60">டெலிவரி நேரம்</dt>
              <dd className="font-semibold">{service.deliveryHours} மணி நேரம்</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-night-800)]/60">அறிக்கை நீளம்</dt>
              <dd className="font-semibold">{service.pageCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-night-800)]/60">வடிவம்</dt>
              <dd className="font-semibold">PDF (WhatsApp வழியாக)</dd>
            </div>
          </dl>

          <Link
            href={{ pathname: "/order", query: { service: service.slug } }}
            className="mt-6 block rounded-full px-6 py-3.5 text-center text-[15px] font-semibold text-[var(--color-paper)] shadow-sm transition-transform hover:scale-[1.02]"
            style={{ background: "var(--color-kumkum-600)" }}
          >
            இதை ஆர்டர் செய்ய
          </Link>
        </aside>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl text-[var(--color-night-900)]">மற்ற சேவைகள்</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
