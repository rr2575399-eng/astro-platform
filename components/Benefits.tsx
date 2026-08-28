const benefits = [
  {
    icon: "🕉️",
    title: "பாரம்பரிய ஜோதிடம்",
    desc: "நூற்றாண்டுகால தமிழ் ஜோதிட நூல்களின் அடிப்படையில் கணிக்கப்படும் அறிக்கைகள்.",
  },
  {
    icon: "🎯",
    title: "துல்லியமான கணக்கீடு",
    desc: "கிரக நிலைகள் நம்பகமான ஜோதிட கணக்கீட்டு பொறி மூலம் மட்டுமே கணக்கிடப்படுகின்றன — யூகிக்கப்படுவதில்லை.",
  },
  {
    icon: "💬",
    title: "எளிய தமிழ் விளக்கம்",
    desc: "சிக்கலான ஜோதிட வார்த்தைகள் இல்லாமல், அன்றாட தமிழில் புரிந்துகொள்ளக்கூடிய விளக்கங்கள்.",
  },
  {
    icon: "📱",
    title: "WhatsApp டெலிவரி",
    desc: "PDF அறிக்கை உங்கள் WhatsApp-க்கு நேரடியாக, பாதுகாப்பான இணைப்பில் அனுப்பப்படும்.",
  },
  {
    icon: "🔒",
    title: "தனியுரிமை பாதுகாப்பு",
    desc: "உங்கள் பிறந்த விவரங்கள் மற்றும் தனிப்பட்ட தகவல்கள் முழுமையாக பாதுகாக்கப்படும்.",
  },
  {
    icon: "⏱️",
    title: "விரைவான டெலிவரி",
    desc: "தேர்ந்தெடுக்கும் அறிக்கையை பொறுத்து 6 முதல் 24 மணி நேரத்திற்குள் அறிக்கை தயார்.",
  },
];

export default function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-xl">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
          ஏன் எங்களை தேர்வு செய்ய வேண்டும்
        </span>
        <h2 className="font-display mt-2 text-3xl text-[var(--color-night-900)] sm:text-4xl">
          நம்பகத்தன்மையும் தெளிவும்
        </h2>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-4">
            <span
              aria-hidden
              className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-xl"
              style={{ background: "var(--color-paper-dim)" }}
            >
              {b.icon}
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-[var(--color-night-900)]">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-night-800)]/75">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
