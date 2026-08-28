const steps = [
  {
    n: "01",
    title: "சேவையை தேர்வு செய்யுங்கள்",
    desc: "உங்களுக்கு தேவையான ஜாதக அறிக்கை வகையை தேர்ந்தெடுக்கவும் — அடிப்படை ஜாதகம் முதல் முழு வாழ்க்கை அறிக்கை வரை.",
  },
  {
    n: "02",
    title: "பிறந்த விவரங்களை பதிவு செய்யுங்கள்",
    desc: "பிறந்த தேதி, துல்லியமான நேரம், இடம் ஆகியவற்றை உள்ளிடவும். இவை துல்லியமான கணிப்புக்கு அவசியம்.",
  },
  {
    n: "03",
    title: "பாதுகாப்பான UPI கட்டணம்",
    desc: "UPI, கார்டு அல்லது நெட் பேங்கிங் மூலம் பாதுகாப்பாக கட்டணம் செலுத்தவும்.",
  },
  {
    n: "04",
    title: "கணிப்பு & AI அறிக்கை தயாரிப்பு",
    desc: "துல்லியமான ஜோதிட கணக்கீட்டு பொறி உங்கள் கிரக நிலைகளை கணக்கிட்டு, அதன் அடிப்படையில் தமிழில் விரிவான அறிக்கை தயாராகிறது.",
  },
  {
    n: "05",
    title: "WhatsApp வழியாக PDF பெறுங்கள்",
    desc: "தயாரான PDF அறிக்கை உங்கள் WhatsApp எண்ணுக்கு நேரடியாக அனுப்பப்படும்.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-xl">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
          எப்படி செயல்படுகிறது
        </span>
        <h2 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">
          5 எளிய படிகளில் உங்கள் ஜாதகம்
        </h2>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step) => (
          <li
            key={step.n}
            className="rounded-2xl border border-night-900/8 bg-white/60 p-6 shadow-sm"
          >
            <span
              className="font-display text-3xl"
              style={{ color: "var(--color-gold-600)" }}
            >
              {step.n}
            </span>
            <h3 className="mt-3 text-[15px] font-bold text-[var(--color-night-900)]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-night-800)]/75">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
