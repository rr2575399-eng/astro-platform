const HOUSE_MEANINGS: Record<number, string[]> = {
  1: ["Self", "Personality", "Health", "Appearance"],
  2: ["Family", "Wealth", "Speech", "Savings"],
  3: ["Siblings", "Courage", "Communication", "Efforts"],
  4: ["Mother", "Home", "Property", "Education"],
  5: ["Children", "Intelligence", "Creativity", "Past Merit"],
  6: ["Debts", "Diseases", "Enemies", "Service"],
  7: ["Marriage", "Spouse", "Partnership", "Business"],
  8: ["Longevity", "Transformation", "Research", "Sudden Events"],
  9: ["Fortune", "Dharma", "Higher Education", "Spirituality"],
  10: ["Career", "Profession", "Status", "Actions"],
  11: ["Income", "Gains", "Friends", "Fulfilment"],
  12: ["Expenses", "Foreign Lands", "Sleep", "Liberation"],
};

type House = {
  house: number;
  sign: string;
};

type Planet = {
  planet: string;
  house: number;
};

export function analyzeHouses(
  houses: House[],
  planets: Planet[]
) {
  return houses.map((house) => ({
    house: house.house,
    sign: house.sign,
    significations: HOUSE_MEANINGS[house.house] ?? [],
    occupants: planets
      .filter((planet) => planet.house === house.house)
      .map((planet) => planet.planet),
    dataAvailable: true,
  }));
}