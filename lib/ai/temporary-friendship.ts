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

export type TemporaryRelationship =
  | "FRIEND"
  | "ENEMY";

export function getTemporaryRelationship(
  planetSign: string,
  otherPlanetSign: string
): TemporaryRelationship | null {
  const firstIndex = SIGNS.indexOf(planetSign);
  const secondIndex = SIGNS.indexOf(otherPlanetSign);

  if (firstIndex === -1 || secondIndex === -1) {
    return null;
  }

  if (firstIndex === secondIndex) {
    return "ENEMY";
  }

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
  return planets.map((planet) => ({
    planet: planet.planet,
    relationships: planets
      .filter((other) => other.planet !== planet.planet)
      .map((other) => ({
        otherPlanet: other.planet,
        relationship: getTemporaryRelationship(
          planet.sign,
          other.sign
        ),
      })),
  }));
}