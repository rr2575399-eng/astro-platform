export type PlanetRelationship =
  | "FRIEND"
  | "NEUTRAL"
  | "ENEMY";

const NATURAL_RELATIONSHIPS: Record<
  string,
  Record<string, PlanetRelationship>
> = {
  Sun: {
    Moon: "FRIEND",
    Mars: "FRIEND",
    Jupiter: "FRIEND",
    Mercury: "NEUTRAL",
    Venus: "ENEMY",
    Saturn: "ENEMY",
  },
  Moon: {
    Sun: "FRIEND",
    Mercury: "FRIEND",
    Mars: "NEUTRAL",
    Jupiter: "NEUTRAL",
    Venus: "NEUTRAL",
    Saturn: "NEUTRAL",
  },
  Mars: {
    Sun: "FRIEND",
    Moon: "FRIEND",
    Jupiter: "FRIEND",
    Mercury: "ENEMY",
    Venus: "NEUTRAL",
    Saturn: "NEUTRAL",
  },
  Mercury: {
    Sun: "FRIEND",
    Venus: "FRIEND",
    Moon: "ENEMY",
    Mars: "NEUTRAL",
    Jupiter: "NEUTRAL",
    Saturn: "NEUTRAL",
  },
  Jupiter: {
    Sun: "FRIEND",
    Moon: "FRIEND",
    Mars: "FRIEND",
    Mercury: "ENEMY",
    Venus: "ENEMY",
    Saturn: "NEUTRAL",
  },
  Venus: {
    Mercury: "FRIEND",
    Saturn: "FRIEND",
    Sun: "ENEMY",
    Moon: "ENEMY",
    Mars: "NEUTRAL",
    Jupiter: "NEUTRAL",
  },
  Saturn: {
    Mercury: "FRIEND",
    Venus: "FRIEND",
    Sun: "ENEMY",
    Moon: "ENEMY",
    Mars: "ENEMY",
    Jupiter: "NEUTRAL",
  },
};

export function getNaturalRelationship(
  planet: string,
  otherPlanet: string
): PlanetRelationship | null {
  if (planet === otherPlanet) return null;

  return (
    NATURAL_RELATIONSHIPS[planet]?.[otherPlanet] ?? null
  );
}
export function analyzePlanetaryRelationships(
  planets: string[]
) {
  return planets.map((planet) => ({
    planet,
    relationships: planets
      .filter((other) => other !== planet)
      .map((other) => ({
        otherPlanet: other,
        relationship: getNaturalRelationship(
          planet,
          other
        ),
      })),
  }));
}