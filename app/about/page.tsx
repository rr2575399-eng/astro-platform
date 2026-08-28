import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "எங்களை பற்றி",
  description: "ஜாதகம் AI-ன் நோக்கம் மற்றும் நாங்கள் பணிபுரியும் விதம்.",
};

const values = [
  {
    title: "பாரம்பரியம் + தொழில்நுட்பம்",
    desc: "நூற்றாண்டுகால தமிழ் ஜோதிட நூல்களை, நவீன கணக்கீட்டு துல்லியத்துடன் இணைக்கிறோம்.",
  },
  {
    title: "வெளிப்படைத்தன்மை",
    desc: "எங்கள் அறிக்கைகள் எதையும் உத்தரவாதம் அளிக்காது; பாரம்பரிய நம்பிக்கைகளின் அடிப்படையிலான வழிகாட்டுதலை மட்டுமே தருகின்றன.",
  },
  {
    title: "எளிமை",
    desc: "சிக்கலான ஜோதிட வார்த்தைகளை தவிர்த்து, அன்றாட தமிழில் புரிந்துகொள்ளக்கூடிய அறிக்கைகளை வடிவமைக்கிறோம்.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
        எங்களை பற்றி
      </span>
      <h1 className="font-display mt-2 text-4xl text-[var(--color-night-900)]">
        பாரம்பரிய ஜோதிடத்தை, இன்றைய தொழில்நுட்பத்தில்
      </h1>
      <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-night-800)]/80">
        ஜாதகம் AI, தமிழ் பேசும் குடும்பங்களுக்காக உருவாக்கப்பட்ட ஒரு ஜாதக அறிக்கை
        சேவை. பிறந்த தேதி, நேரம், இடம் ஆகியவற்றின் அடிப்படையில் நம்பகமான ஜோதிட
        கணக்கீட்டு பொறி மூலம் கிரக நிலைகளை துல்லியமாக கணக்கிட்டு, அதன் அடிப்படையில்
        AI உதவியுடன் எளிய தமிழில் விரிவான அறிக்கையை தயார் செய்கிறோம்.
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-night-800)]/80">
        எங்கள் நோக்கம் — ஜோதிடத்தை மூடநம்பிக்கையாக அல்லாமல், தன்னைப் புரிந்துகொள்ளவும்,
        முக்கிய முடிவுகளுக்கு முன் ஒரு கூடுதல் பார்வையை பெறவும் உதவும் ஒரு
        கருவியாக வழங்குவது.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-night-900/8 bg-white p-5">
            <h3 className="text-sm font-bold text-[var(--color-night-900)]">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-night-800)]/75">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
