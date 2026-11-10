import { getNaturalRelationship } from "./planetary-intelligence";

import {
  getTemporaryRelationship,
} from "./temporary-friendship";

export type PanchadhaRelationship =
  | "GREAT_FRIEND"
  | "FRIEND"
  | "NEUTRAL"
  | "ENEMY"
  | "GREAT_ENEMY"
  | "UNKNOWN";

export function getPanchadhaRelationship(
  planet: string,
  otherPlanet: string,
  planetSign: string,
  otherPlanetSign: string
): PanchadhaRelationship {
  const natural = getNaturalRelationship(
    planet,
    otherPlanet
  );

  const temporary = getTemporaryRelationship(
    planetSign,
    otherPlanetSign
  );

  if (!natural || !temporary) {
    return "UNKNOWN";
  }

  if (natural === "FRIEND" && temporary === "FRIEND") {
    return "GREAT_FRIEND";
  }

  if (natural === "FRIEND" && temporary === "ENEMY") {
    return "NEUTRAL";
  }

  if (natural === "NEUTRAL" && temporary === "FRIEND") {
    return "FRIEND";
  }

  if (natural === "NEUTRAL" && temporary === "ENEMY") {
    return "ENEMY";
  }

  if (natural === "ENEMY" && temporary === "FRIEND") {
    return "NEUTRAL";
  }

  return "GREAT_ENEMY";
}