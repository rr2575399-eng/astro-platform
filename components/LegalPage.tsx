export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
        {eyebrow}
      </span>
      <h1 className="font-display mt-2 text-4xl text-[var(--color-night-900)]">{title}</h1>
      <p className="mt-2 text-xs text-[var(--color-night-800)]/50">கடைசியாக புதுப்பிக்கப்பட்டது: {updated}</p>

      <div className="prose-legal mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--color-night-800)]/85">
        {children}
      </div>

      <div
        className="mt-10 rounded-xl border p-4 text-xs leading-relaxed"
        style={{ borderColor: "rgba(156,43,69,0.25)", background: "rgba(156,43,69,0.05)" }}
      >
        <strong style={{ color: "var(--color-kumkum-600)" }}>வரைவு குறிப்பு:</strong>{" "}
        இந்த பக்கம் Phase 1 வரைவு உரை. நிறுவனத்தின் சட்ட ஆலோசகரால் மதிப்பாய்வு
        செய்யப்பட்ட பின்னரே இது இணையதளத்தில் இறுதியாக வெளியிடப்பட வேண்டும்.
      </div>
    </div>
  );
}
