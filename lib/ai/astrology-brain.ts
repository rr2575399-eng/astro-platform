import {
  getPanchadhaRelationship,
} from "./panchadha-maitri";
import {
  analyzeTemporaryFriendships,
} from "./temporary-friendship";
import { analyzeHouses } from "./house-analysis";
import { analyzeHouseLords } from "./house-lord-intelligence";
import { getPlanetaryDignity } from "./planetary-dignity";
import {
  analyzePlanetaryRelationships,
} from "./planetary-intelligence";
export type AstrologyBrainInput = {
  serviceSlug: string;

  customerQuestion: string[];

  chart: {
    planets: unknown[];
    houses: unknown[];
    dashas: unknown[];
    currentMahadasha?: unknown;
    currentAntardasha?: unknown;
    currentPratyantar?: unknown;
    birthTimeKnown?: boolean;
    d9?: unknown;
    d10?: unknown;
    ascendant?: string;
    ascendantLord?: string;
    moonSign?: string;
    nakshatra?: string;
    pada?: number;
  };
};

export type AstrologyBrainContext = {
  service: string;
  questions: string[];
  astrologyData: AstrologyBrainInput["chart"];
  planetaryRelationships: ReturnType<
  typeof analyzePlanetaryRelationships
>;
planetaryDignity: Array<{
  planet: string;
  sign: string;
  dignity: ReturnType<typeof getPlanetaryDignity>;
}>;
houseLordAnalysis: ReturnType<typeof analyzeHouseLords>;
houseAnalysis: ReturnType<typeof analyzeHouses>;
temporaryFriendships: ReturnType<
  typeof analyzeTemporaryFriendships
>;
panchadhaMaitri: Array<{
  planet: string;
  relationships: Array<{
    otherPlanet: string;
    relationship: ReturnType<
      typeof getPanchadhaRelationship
    >;
  }>;
}>;
};

export function buildAstrologyBrainContext(
  input: AstrologyBrainInput
 
): AstrologyBrainContext {
    const planetNames = input.chart.planets
  .map((item) => {
    if (
      typeof item === "object" &&
      item !== null &&
      "planet" in item &&
      typeof item.planet === "string"
    ) {
      return item.planet;
    }

    return "";
  })
  .filter(Boolean);

const planetaryRelationships =
  analyzePlanetaryRelationships(planetNames);
  const planetaryDignity = input.chart.planets
  .filter(
    (item): item is {
      planet: string;
      sign: string;
    } =>
      typeof item === "object" &&
      item !== null &&
      "planet" in item &&
      "sign" in item &&
      typeof item.planet === "string" &&
      typeof item.sign === "string"
  )
  .map((item) => ({
    planet: item.planet,
    sign: item.sign,
    dignity: getPlanetaryDignity(
      item.planet,
      item.sign
    ),
  }));
  const houseLordAnalysis = analyzeHouseLords(
  input.chart.houses as {
    house: number;
    sign: string;
  }[],
  input.chart.planets as {
    planet: string;
    sign: string;
    house: number;
  }[]
);
const houseAnalysis = analyzeHouses(
  input.chart.houses as {
    house: number;
    sign: string;
  }[],
  input.chart.planets as {
    planet: string;
    house: number;
  }[]
);
const temporaryFriendships = analyzeTemporaryFriendships(
  input.chart.planets
    .filter(
      (item): item is {
        planet: string;
        sign: string;
      } =>
        typeof item === "object" &&
        item !== null &&
        "planet" in item &&
        "sign" in item &&
        typeof item.planet === "string" &&
        typeof item.sign === "string"
    )
    .map((item) => ({
      planet: item.planet,
      sign: item.sign,
    }))
);
const panchadhaMaitri = input.chart.planets
  .filter(
    (item): item is {
      planet: string;
      sign: string;
    } =>
      typeof item === "object" &&
      item !== null &&
      "planet" in item &&
      "sign" in item &&
      typeof item.planet === "string" &&
      typeof item.sign === "string"
  )
  .map((planet) => ({
    planet: planet.planet,
    relationships: input.chart.planets
      .filter(
        (other) =>
          typeof other === "object" &&
          other !== null &&
          "planet" in other &&
          "sign" in other &&
          typeof other.planet === "string" &&
          typeof other.sign === "string" &&
          other.planet !== planet.planet
      )
      .map((other) => {
        const otherPlanet = other as {
          planet: string;
          sign: string;
        };

        return {
          otherPlanet: otherPlanet.planet,
          relationship: getPanchadhaRelationship(
            planet.planet,
            otherPlanet.planet,
            planet.sign,
            otherPlanet.sign
          ),
        };
      }),
  }));
  return {
    service: input.serviceSlug,
    questions: input.customerQuestion,
    astrologyData: input.chart,
    planetaryRelationships,
    planetaryDignity,
    houseLordAnalysis,
    houseAnalysis,
    temporaryFriendships,
    panchadhaMaitri,
  };
}
import { applyAstrologyRules } from "./astrology-rules";

export function createAstrologyBrainPrompt(
  context: AstrologyBrainContext
): string {
  const result = applyAstrologyRules(context);

  return `
You are our proprietary Tamil Astrology AI Brain.

YOUR ROLE:
Interpret the supplied horoscope data accurately.
You are an interpretation engine, not a chart calculation engine.

ASTROLOGY RULES:
${result.rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n")}

DATA AVAILABILITY:
${JSON.stringify(result.availableData, null, 2)}

PLANETARY RELATIONSHIP ANALYSIS:
${JSON.stringify(context.planetaryRelationships, null, 2)}

TEMPORARY FRIENDSHIP ANALYSIS:
${JSON.stringify(context.temporaryFriendships, null, 2)}

PANCHADHA MAITRI ANALYSIS:
${JSON.stringify(context.panchadhaMaitri, null, 2)}

PANCHADHA MAITRI INTERPRETATION RULES:
- GREAT_FRIEND means natural friend and temporary friend.
- FRIEND means natural neutral and temporary friend.
- NEUTRAL means the combined relationship is neutral.
- ENEMY means natural neutral and temporary enemy.
- GREAT_ENEMY means natural enemy and temporary enemy.
- UNKNOWN means the relationship could not be determined.
- Use this analysis as supporting information only.
- Never interpret friendship alone as complete planetary strength.

TEMPORARY FRIENDSHIP RULES:
- Use the supplied temporary friendship analysis.
- Distinguish natural friendship from temporary friendship.
- Do not confuse temporary friendship with permanent planetary relationships.
- Consider both natural and temporary relationships before interpretation.
- Do not invent missing planetary relationships.

PLANETARY DIGNITY ANALYSIS:
${JSON.stringify(context.planetaryDignity, null, 2)}

HOUSE LORD ANALYSIS:
${JSON.stringify(context.houseLordAnalysis, null, 2)}

HOUSE ANALYSIS:
${JSON.stringify(context.houseAnalysis, null, 2)}

HOUSE INTERPRETATION RULES:
- Explain each house using its supplied significations.
- Identify planets occupying each house.
- Consider the house lord's placement together with house occupants.
- Do not assume an empty house gives no results.
- Do not predict outcomes from one house alone.
- Use only the supplied chart data.
- Clearly distinguish traditional interpretation from confirmed facts.

HOUSE LORD INTERPRETATION RULES:
- Identify the lord of each house using the supplied analysis.
- Check where each house lord is placed.
- Explain the relationship between the house and its lord.
- Use D1 as the primary chart.
- Do not invent missing house lord positions.
- Do not make predictions from house lord placement alone.
- Consider other supplied planetary factors before interpreting.

DIGNITY INTERPRETATION RULES:
- EXALTED means the planet is in its traditional exaltation sign.
- DEBILITATED means the planet is in its traditional debilitation sign.
- OWN_SIGN means the planet is in one of its own signs.
- OTHER means none of the above.
- Do not interpret dignity alone as the complete strength of a planet.
- Consider house ownership, placement and other supplied chart factors.
- Never invent missing planetary information.

INTERPRETATION RULE:
Use planetary relationships as supporting information.
Do not treat natural friendship as temporary friendship,
planetary strength or final horoscope results.

Write a personalized, clear and natural Tamil astrology interpretation.
Do not invent missing information.
`;
}