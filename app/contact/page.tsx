import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "தொடர்பு கொள்ள",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
        தொடர்பு
      </span>
      <h1 className="font-display mt-2 text-4xl text-[var(--color-night-900)]">எங்களை தொடர்பு கொள்ளுங்கள்</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-night-800)]/80">
        ஆர்டர் தொடர்பான கேள்விகள், பணம் திரும்பப் பெறும் கோரிக்கைகள் அல்லது பொது
        விசாரணைகளுக்கு கீழே உள்ள வழிகளில் தொடர்பு கொள்ளலாம்.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-night-900/8 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-night-800)]/50">WhatsApp</p>
          <p className="mt-1 font-semibold text-[var(--color-night-900)]">+91 00000 00000</p>
          <p className="mt-1 text-xs text-[var(--color-night-800)]/55">காலை 9 — இரவு 9 (தினமும்)</p>
        </div>
        <div className="rounded-2xl border border-night-900/8 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-night-800)]/50">மின்னஞ்சல்</p>
          <p className="mt-1 font-semibold text-[var(--color-night-900)]">support@jathagam-ai.example</p>
          <p className="mt-1 text-xs text-[var(--color-night-800)]/55">24 மணி நேரத்திற்குள் பதில்</p>
        </div>
      </div>

      <form className="mt-10 space-y-4 rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-night-900)]">பெயர்</label>
            <input id="name" className="mt-1 w-full rounded-xl border border-night-900/15 px-4 py-3 text-[15px]" />
          </div>
          <div>
            <label htmlFor="mobile2" className="block text-sm font-semibold text-[var(--color-night-900)]">மொபைல் எண்</label>
            <input id="mobile2" className="mt-1 w-full rounded-xl border border-night-900/15 px-4 py-3 text-[15px]" />
          </div>
        </div>
        <div>
          <label htmlFor="msg" className="block text-sm font-semibold text-[var(--color-night-900)]">செய்தி</label>
          <textarea id="msg" rows={4} className="mt-1 w-full rounded-xl border border-night-900/15 px-4 py-3 text-[15px]" />
        </div>
        <button
          type="button"
          disabled
          className="rounded-full px-6 py-3 text-sm font-semibold text-[var(--color-paper)] opacity-60"
          style={{ background: "var(--color-kumkum-600)" }}
        >
          அனுப்பு
        </button>
        <p className="text-xs text-[var(--color-night-800)]/55">
          இந்த படிவம் காட்சிக்காக மட்டுமே — backend இணைப்பு அடுத்த கட்டத்தில் சேர்க்கப்படும். தற்போதைக்கு WhatsApp/மின்னஞ்சல் வழியாக தொடர்பு கொள்ளவும்.
        </p>
      </form>
    </div>
  );
}
