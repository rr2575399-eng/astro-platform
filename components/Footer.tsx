import Link from "next/link";

const columns = [
  {
    title: "சேவைகள்",
    links: [
      { href: "/services/detailed-jathagam", label: "விரிவான ஜாதகம்" },
      { href: "/services/marriage-report", label: "திருமண ஜாதகம்" },
      { href: "/services/career-report", label: "தொழில் ஜாதகம்" },
      { href: "/services", label: "அனைத்து சேவைகளும்" },
    ],
  },
  {
    title: "நிறுவனம்",
    links: [
      { href: "/about", label: "எங்களை பற்றி" },
      { href: "/faq", label: "கேள்வி பதில்" },
      { href: "/contact", label: "தொடர்பு கொள்ள" },
      { href: "/order/track", label: "ஆர்டர் நிலை" },
    ],
  },
  {
    title: "கொள்கைகள்",
    links: [
      { href: "/privacy-policy", label: "தனியுரிமைக் கொள்கை" },
      { href: "/terms", label: "விதிமுறைகள்" },
      { href: "/refund-policy", label: "பணம் திரும்பப் பெறும் கொள்கை" },
      { href: "/disclaimer", label: "மறுப்பு அறிக்கை" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="mt-24 star-field text-[var(--color-paper)]"
      style={{ background: "var(--color-night-900)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl">
              ஜாதகம் <span style={{ color: "var(--color-gold-300)" }}>AI</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-violet-400)]">
              பாரம்பரிய ஜோதிட நூல்களின் அடிப்படையிலான கணிப்புகள் மற்றும் AI
              உதவியுடன் தயாரிக்கப்படும் தனிப்பயன் தமிழ் ஜாதக அறிக்கைகள்.
            </p>
            <p className="mt-4 text-xs text-[var(--color-violet-400)]/80">
              இந்த அறிக்கைகள் பாரம்பரிய ஜோதிட நம்பிக்கைகளை அடிப்படையாகக்
              கொண்டவை; அறிவியல் பூர்வமான உத்தரவாதம் அல்ல.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-[var(--color-gold-300)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-paper)]/85 transition-colors hover:text-[var(--color-gold-300)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[var(--color-paper)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ஜாதகம் AI. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
          <p>Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
