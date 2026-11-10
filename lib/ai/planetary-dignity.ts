export type PlanetDignity =
  | "EXALTED"
  | "DEBILITATED"
  | "OWN_SIGN"
  | "OTHER";

const DIGNITY_TABLE: Record<
  string,
  {
    exalted: string;
    debilitated: string;
    ownSigns: string[];
  }
> = {
  Sun: {
    exalted: "Mesha",
    debilitated: "Tula",
    ownSigns: ["Simha"],
  },
  Moon: {
    exalted: "Vrishabha",
    debilitated: "Vrischika",
    ownSigns: ["Karka"],
  },
  Mars: {
    exalted: "Makara",
    debilitated: "Karka",
    ownSigns: ["Mesha", "Vrischika"],
  },
  Mercury: {
    exalted: "Kanya",
    debilitated: "Meena",
    ownSigns: ["Mithuna", "Kanya"],
  },
  Jupiter: {
    exalted: "Karka",
    debilitated: "Makara",
    ownSigns: ["Dhanu", "Meena"],
  },
  Venus: {
    exalted: "Meena",
    debilitated: "Kanya",
    ownSigns: ["Vrishabha", "Tula"],
  },
  Saturn: {
    exalted: "Tula",
    debilitated: "Mesha",
    ownSigns: ["Makara", "Kumbha"],
  },
};

export function getPlanetaryDignity(
  planet: string,
  sign: string
): PlanetDignity | null {
  const data = DIGNITY_TABLE[planet];

  if (!data) return null;

  if (data.exalted === sign) return "EXALTED";

  if (data.debilitated === sign) return "DEBILITATED";

  if (data.ownSigns.includes(sign)) return "OWN_SIGN";

  return "OTHER";
}