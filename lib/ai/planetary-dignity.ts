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

const SIGN_ALIASES: Record<string, string> = {
  aries: "Mesha",
  mesha: "Mesha",
  taurus: "Vrishabha",
  vrishabha: "Vrishabha",
  gemini: "Mithuna",
  mithuna: "Mithuna",
  cancer: "Karka",
  karka: "Karka",
  leo: "Simha",
  simha: "Simha",
  virgo: "Kanya",
  kanya: "Kanya",
  libra: "Tula",
  tula: "Tula",
  scorpio: "Vrischika",
  vrischika: "Vrischika",
  sagittarius: "Dhanu",
  dhanu: "Dhanu",
  capricorn: "Makara",
  makara: "Makara",
  aquarius: "Kumbha",
  kumbha: "Kumbha",
  pisces: "Meena",
  meena: "Meena",
};

function normalizePlanetName(planet: string): string {
  const value = planet.trim().toLowerCase();

  return (
    Object.keys(DIGNITY_TABLE).find(
      (name) => name.toLowerCase() === value
    ) ?? ""
  );
}

function normalizeSign(sign: string): string {
  return SIGN_ALIASES[sign.trim().toLowerCase()] ?? "";
}

export function getPlanetaryDignity(
  planet: string,
  sign: string
): PlanetDignity | null {
  const normalizedPlanet = normalizePlanetName(planet);
  const normalizedSign = normalizeSign(sign);

  if (!normalizedPlanet || !normalizedSign) {
    return null;
  }

  const data = DIGNITY_TABLE[normalizedPlanet];

  if (data.exalted === normalizedSign) return "EXALTED";

  if (data.debilitated === normalizedSign) return "DEBILITATED";

  if (data.ownSigns.includes(normalizedSign)) return "OWN_SIGN";

  return "OTHER";
}