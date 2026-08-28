// Signature element for the hero: a stylised navagraha (nine-planet) wheel
// inspired by a South Indian kattam/kundli chart — the outer ring of
// nakshatra markers drifts slowly, the inner ring counter-rotates.
// This stands in for a generic gradient blob/stock illustration.

const grahas = [
  { symbol: "☉", label: "சூரியன்" },
  { symbol: "☽", label: "சந்திரன்" },
  { symbol: "♂", label: "செவ்வாய்" },
  { symbol: "☿", label: "புதன்" },
  { symbol: "♃", label: "குரு" },
  { symbol: "♀", label: "சுக்கிரன்" },
  { symbol: "♄", label: "சனி" },
  { symbol: "☊", label: "ராகு" },
  { symbol: "☋", label: "கேது" },
];

export default function NavagrahaChart() {
  const center = 200;
  const outerR = 168;
  const innerR = 118;

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="ஒன்பது கிரகங்களின் ஜோதிட சக்கரம்"
      className="mx-auto h-full w-full max-w-[420px]"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0.9" />
          <stop offset="55%" stopColor="var(--color-gold-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* faint outer boundary circles */}
      <circle cx={center} cy={center} r={outerR} fill="none" stroke="var(--color-violet-400)" strokeOpacity="0.35" />
      <circle cx={center} cy={center} r={innerR} fill="none" stroke="var(--color-violet-400)" strokeOpacity="0.25" />
      <circle cx={center} cy={center} r={72} fill="url(#coreGlow)" />

      {/* central lagna marker */}
      <g>
        <circle cx={center} cy={center} r="34" fill="var(--color-night-900)" stroke="var(--color-gold-500)" strokeWidth="1.5" />
        <text
          x={center}
          y={center + 6}
          textAnchor="middle"
          fontSize="14"
          fill="var(--color-paper)"
          className="font-display"
        >
          லக்னம்
        </text>
      </g>

      {/* outer ring: 9 grahas, slow rotation */}
      <g className="orbit-ring">
        {grahas.map((g, i) => {
          const angle = (i / grahas.length) * 2 * Math.PI - Math.PI / 2;
          const x = center + outerR * Math.cos(angle);
          const y = center + outerR * Math.sin(angle);
          return (
            <g key={g.label}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--color-violet-400)"
                strokeOpacity="0.15"
              />
              <circle cx={x} cy={y} r="19" fill="var(--color-night-800)" stroke="var(--color-gold-500)" strokeWidth="1" />
              <text x={x} y={y + 6} textAnchor="middle" fontSize="16" fill="var(--color-gold-300)">
                {g.symbol}
              </text>
            </g>
          );
        })}
      </g>

      {/* inner ring: 12 house ticks, counter-rotation */}
      <g className="orbit-ring-reverse">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const x1 = center + (innerR - 6) * Math.cos(angle);
          const y1 = center + (innerR - 6) * Math.sin(angle);
          const x2 = center + (innerR + 6) * Math.cos(angle);
          const y2 = center + (innerR + 6) * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-kumkum-500)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
}
