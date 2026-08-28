const steps = [
  "வாடிக்கையாளர் விவரம்",
  "பிறந்த விவரம்",
  "சேவை தேர்வு",
  "கேள்விகள்",
  "பரிசீலனை",
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-2 sm:gap-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const state =
          stepNum < current ? "done" : stepNum === current ? "active" : "upcoming";
        return (
          <li key={label} className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                aria-current={state === "active" ? "step" : undefined}
                className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-xs font-bold"
                style={{
                  background:
                    state === "upcoming" ? "var(--color-paper-dim)" : "var(--color-kumkum-600)",
                  color: state === "upcoming" ? "var(--color-night-800)" : "var(--color-paper)",
                  opacity: state === "upcoming" ? 0.7 : 1,
                }}
              >
                {state === "done" ? "✓" : stepNum}
              </span>
              <span
                className="hidden text-xs font-medium sm:block"
                style={{
                  color: state === "upcoming" ? "var(--color-night-800)" : "var(--color-night-900)",
                  opacity: state === "upcoming" ? 0.55 : 1,
                }}
              >
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <span className="mx-1 h-px w-4 flex-shrink-0 bg-night-900/15 sm:w-8" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
