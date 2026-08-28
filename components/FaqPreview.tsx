import Link from "next/link";

const faqs = [
  {
    q: "எனது பிறந்த நேரம் சரியாக தெரியவில்லை என்றால்?",
    a: "பிறந்த நேரம் இல்லாமலும் ஆர்டர் செய்யலாம். ஆனால் துல்லியமான லக்ன கணிப்புக்கு சரியான நேரம் இருப்பது சிறந்தது. ஆர்டர் படிவத்தில் 'நேரம் தெரியவில்லை' என்பதை தேர்வு செய்யலாம்.",
  },
  {
    q: "அறிக்கை எவ்வளவு நேரத்தில் கிடைக்கும்?",
    a: "தேர்ந்தெடுக்கும் சேவையை பொறுத்து 6 முதல் 24 மணி நேரத்திற்குள் WhatsApp வழியாக PDF அறிக்கை அனுப்பப்படும்.",
  },
  {
    q: "கட்டணம் திரும்பப் பெற முடியுமா?",
    a: "அறிக்கை உருவாக்கம் தொடங்குவதற்கு முன் கோரிக்கை வைத்தால் முழு தொகையும் திரும்ப அளிக்கப்படும். விவரங்களுக்கு எங்கள் பணம் திரும்பப் பெறும் கொள்கையை பார்க்கவும்.",
  },
  {
    q: "இந்த கணிப்புகள் எவ்வளவு துல்லியமானவை?",
    a: "இவை பாரம்பரிய ஜோதிட நூல்களின் அடிப்படையில் கணக்கிடப்படும் கருத்துகள். இவை அறிவியல் பூர்வமான உத்தரவாதங்கள் அல்ல; வாழ்க்கை முடிவுகளை எடுக்க முன் உங்கள் சொந்த விவேகத்தையும் பயன்படுத்தவும்.",
  },
];

export default function FaqPreview() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
          கேள்வி பதில்
        </span>
        <h2 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">
          அடிக்கடி கேட்கப்படும் கேள்விகள்
        </h2>
      </div>

      <div className="mt-10 divide-y divide-night-900/8 rounded-2xl border border-night-900/8 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-[var(--color-night-900)]">
              {f.q}
              <span
                aria-hidden
                className="flex-shrink-0 text-lg transition-transform group-open:rotate-45"
                style={{ color: "var(--color-kumkum-600)" }}
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-night-800)]/75">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--color-night-800)]/70">
        மேலும் கேள்விகள் உள்ளதா?{" "}
        <Link href="/faq" className="font-semibold underline" style={{ color: "var(--color-kumkum-600)" }}>
          அனைத்து கேள்வி பதில்களையும் பார்க்க
        </Link>
      </p>
    </section>
  );
}
