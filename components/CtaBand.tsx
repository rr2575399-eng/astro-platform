import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div
        className="star-field flex flex-col items-center gap-5 rounded-3xl px-6 py-14 text-center text-[var(--color-paper)] sm:px-10"
        style={{
          background:
            "linear-gradient(135deg, var(--color-night-900), var(--color-night-700))",
        }}
      >
        <h2 className="font-display max-w-xl text-3xl leading-tight sm:text-4xl">
          இன்றே உங்கள் ஜாதகத்தை புரிந்து கொள்ளுங்கள்
        </h2>
        <p className="max-w-md text-[var(--color-paper)]/80">
          5 நிமிடங்களில் ஆர்டர் செய்யுங்கள். WhatsApp வழியாக நேரடியாக அறிக்கை பெறுங்கள்.
        </p>
        <Link
          href="/order"
          className="mt-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-[var(--color-night-950)] shadow-lg transition-transform hover:scale-[1.02]"
          style={{ background: "var(--color-gold-500)" }}
        >
          ஜாதகம் ஆர்டர் செய்ய →
        </Link>
      </div>
    </section>
  );
}
