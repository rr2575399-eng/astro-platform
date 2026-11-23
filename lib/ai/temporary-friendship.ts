const SIGNS = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
];

const SIGN_ALIASES: Record<string, string> = {
  aries: "Mesha",
  taurus: "Vrishabha",
  gemini: "Mithuna",
  cancer: "Karka",
  leo: "Simha",
  virgo: "Kanya",
  libra: "Tula",
  scorpio: "Vrischika",
  sagittarius: "Dhanu",
  capricorn: "Makara",
  aquarius: "Kumbha",
  pisces: "Meena",
};

export type TemporaryRelationship =
  | "FRIEND"
  | "ENEMY";

function normalizeSign(sign: string): string | null {
  const value = sign.trim().toLowerCase();

  const canonical =
    SIGN_ALIASES[value] ??
    SIGNS.find(
      (item) => item.toLowerCase() === value
    );

  return canonical ?? null;
}

export function getTemporaryRelationship(
  planetSign: string,
  otherPlanetSign: string
): TemporaryRelationship | null {
  const normalizedFirst = normalizeSign(planetSign);
  const normalizedSecond = normalizeSign(otherPlanetSign);

  if (!normalizedFirst || !normalizedSecond) {
    return null;
  }

  const firstIndex = SIGNS.indexOf(normalizedFirst);
  const secondIndex = SIGNS.indexOf(normalizedSecond);

  const distance =
    (secondIndex - firstIndex + 12) % 12 + 1;

  const friendlyPositions = [2, 3, 4, 10, 11, 12];

  return friendlyPositions.includes(distance)
    ? "FRIEND"
    : "ENEMY";
}

export function analyzeTemporaryFriendships(
  planets: {
    planet: string;
    sign: string;
  }[]
) {
  return planets.map((planet, index) => ({
    planet: planet.planet,
    relationships: planets
      .filter((_, otherIndex) => otherIndex !== index)
      .map((other) => ({
        otherPlanet: other.planet,
        relationship: getTemporaryRelationship(
          planet.sign,
          other.sign
        ),
      })),
  }));
}