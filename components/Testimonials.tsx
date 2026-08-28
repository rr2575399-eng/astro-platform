const reviews = [
  {
    name: "செல்வகுமார், கோயம்புத்தூர்",
    text: "என் மகளின் திருமண ஜாதகத்திற்காக ஆர்டர் செய்தேன். எளிய தமிழில், மிக விரிவாக இருந்தது. WhatsApp-லேயே PDF வந்துவிட்டது.",
    service: "திருமண ஜாதகம்",
  },
  {
    name: "பிரியா, சென்னை",
    text: "தொழில் மாற்றம் பற்றி குழப்பமாக இருந்தேன். Career Report மிகவும் தெளிவாக வழிகாட்டியது. விலையும் மலிவு.",
    service: "தொழில் ஜாதகம்",
  },
  {
    name: "முருகன், மதுரை",
    text: "6 மணி நேரத்திலேயே அறிக்கை வந்துவிட்டது என்று எதிர்பார்க்கவில்லை. மிக நேர்த்தியான PDF வடிவமைப்பு.",
    service: "அடிப்படை ஜாதகம்",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20" style={{ background: "var(--color-paper-dim)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-xl">
          <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
            வாடிக்கையாளர் கருத்துகள்
          </span>
          <h2 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">
            எங்கள் வாடிக்கையாளர்கள் சொல்வது
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p aria-hidden style={{ color: "var(--color-gold-600)" }} className="text-lg">
                ★★★★★
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-night-800)]/85">
                “{r.text}”
              </p>
              <footer className="mt-4 border-t border-night-900/8 pt-3">
                <p className="text-sm font-semibold text-[var(--color-night-900)]">{r.name}</p>
                <p className="text-xs text-[var(--color-night-800)]/55">{r.service}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
