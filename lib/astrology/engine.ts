import { BirthDetailsDraft } from "@/types";
export interface PlanetPosition { planet: string; sign: string; degree: number; house: number; retrograde: boolean; }
export interface HousePosition { house: number; sign: string; }
export interface DashaPeriod { planet: string; startDate: string; endDate: string; }
export interface AstrologyCalculation { ascendant: string; moonSign: string; nakshatra: string; pada: number; planets: PlanetPosition[]; houses: HousePosition[]; dashas: DashaPeriod[]; }

export async function calculateChart(birthDetails: BirthDetailsDraft): Promise<AstrologyCalculation> {
  const url = process.env.ASTROLOGY_API_URL;
  const key = process.env.ASTROLOGY_API_KEY;
  if (!url || !key) throw new Error("Astrology calculation engine is not configured. Add a deterministic ephemeris/API before selling reports.");
  const res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify(birthDetails), cache: "no-store" });
  if (!res.ok) throw new Error(`Astrology provider failed: ${await res.text()}`);
  const data = await res.json();
  if (!data?.ascendant || !Array.isArray(data?.planets)) throw new Error("Astrology provider returned incomplete chart data");
  return data as AstrologyCalculation;
}
