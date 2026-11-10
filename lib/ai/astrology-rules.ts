import type { AstrologyBrainContext } from "./astrology-brain";

export type AstrologyRuleResult = {
  rules: string[];
  availableData: {
    planets: boolean;
    houses: boolean;
    dashas: boolean;
    navamsa: boolean;
    dasamsa: boolean;
  };
};

export function applyAstrologyRules(
  context: AstrologyBrainContext
): AstrologyRuleResult {
  const chart = context.astrologyData;

  const availableData = {
    planets: Array.isArray(chart.planets) && chart.planets.length > 0,
    houses: Array.isArray(chart.houses) && chart.houses.length > 0,
    dashas: Array.isArray(chart.dashas) && chart.dashas.length > 0,
    navamsa: !!chart.d9,
    dasamsa: !!chart.d10,
  };

  const rules = [
  "Use only the supplied astrology data.",
  "Never invent planetary positions, houses, yogas or Dasha dates.",
  "Give priority to the customer's questions.",
  "Use D1 as the primary chart for general horoscope interpretation.",
  "Use D9 only when valid D9 data is supplied.",
  "Use D9 to support marriage, spouse and dharma-related interpretation.",
  "Use D10 only when valid D10 data is supplied.",
  "Use D10 to support career, profession and work-related interpretation.",
  "Never treat D9 or D10 as a replacement for D1.",
  "Do not predict exact events without supporting data.",
  "Clearly distinguish available facts from interpretation.",
  "Never give fear-based predictions or guaranteed results.",
  "Check birthTimeKnown before interpreting time-sensitive chart details.",
"If birthTimeKnown is false, do not make reliable claims based on Ascendant, houses, D9 or D10.",
"If birthTimeKnown is false, clearly inform the customer that birth-time-dependent interpretations are limited.",
"Never treat a noon placeholder as the customer's actual birth time.",
];

  return {
    rules,
    availableData,
  };
}