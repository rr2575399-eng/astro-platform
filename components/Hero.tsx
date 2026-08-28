import Link from "next/link";
import NavagrahaChart from "./NavagrahaChart";

export default function Hero() {
  return (
    <section
      className="star-field relative overflow-hidden text-[var(--color-paper)]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-night-950) 0%, var(--color-night-900) 60%, var(--color-night-800) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{ background: "rgba(224,165,44,0.15)", color: "var(--color-gold-300)" }}
          >
            10,000+ ஜாதகங்கள் தயாரிக்கப்பட்டுள்ளன
          </span>

          <h1 className="font-display mt-5 text-4xl leading-tight sm:text-5xl md:text-[3.4rem]">
            உங்கள் ஜாதகத்தை
            <br />
            <span style={{ color: "var(--color-gold-300)" }}>புரிந்து கொள்ளுங்கள்</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-paper)]/85">
            AI உதவியுடன் தனிப்பட்ட ஜாதக அறிக்கையைப் பெறுங்கள் — பாரம்பரிய
            ஜோதிட நூல்களின் அடிப்படையில், WhatsApp வழியாக நேரடியாக உங்கள்
            கைபேசிக்கு.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/order"
              className="rounded-full px-7 py-3.5 text-center text-[15px] font-semibold text-[var(--color-night-950)] shadow-lg transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-gold-500)" }}
            >
              ஜாதகம் ஆர்டர் செய்ய →
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/25 px-7 py-3.5 text-center text-[15px] font-semibold text-[var(--color-paper)] transition-colors hover:bg-white/10"
            >
              சேவைகளை பார்க்க
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ["₹19", "ஆரம்ப விலை"],
              ["1 மணி", "விரைவு டெலிவரி"],
              ["4.8★", "வாடிக்கையாளர் மதிப்பீடு"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-xl" style={{ color: "var(--color-gold-300)" }}>
                  {value}
                </dd>
                <dd className="mt-0.5 text-xs text-[var(--color-paper)]/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <NavagrahaChart />
        </div>
      </div>
    </section>
  );
}
