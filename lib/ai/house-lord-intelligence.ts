const SIGN_LORDS: Record<string, string> = {
  Mesha: "Mars",
  Vrishabha: "Venus",
  Mithuna: "Mercury",
  Karka: "Moon",
  Simha: "Sun",
  Kanya: "Mercury",
  Tula: "Venus",
  Vrischika: "Mars",
  Dhanu: "Jupiter",
  Makara: "Saturn",
  Kumbha: "Saturn",
  Meena: "Jupiter",
};

type House = {
  house: number;
  sign: string;
};

type Planet = {
  planet: string;
  sign: string;
  house: number;
};

export function analyzeHouseLords(
  houses: House[],
  planets: Planet[]
) {
  return houses.map((house) => {
    const lord = SIGN_LORDS[house.sign];

    const lordPosition = planets.find(
      (planet) => planet.planet === lord
    );

    return {
      house: house.house,
      sign: house.sign,
      lord,
      lordSign: lordPosition?.sign ?? null,
      lordPlacementHouse: lordPosition?.house ?? null,
      dataAvailable: Boolean(lordPosition),
    };
  });
}