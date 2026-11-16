const SIGN_LORDS: Record<string, string> = {
  // English names
  aries: "Mars",
  taurus: "Venus",
  gemini: "Mercury",
  cancer: "Moon",
  leo: "Sun",
  virgo: "Mercury",
  libra: "Venus",
  scorpio: "Mars",
  sagittarius: "Jupiter",
  capricorn: "Saturn",
  aquarius: "Saturn",
  pisces: "Jupiter",

  // Tamil transliteration names
  mesha: "Mars",
  vrishabha: "Venus",
  mithuna: "Mercury",
  karka: "Moon",
  simha: "Sun",
  kanya: "Mercury",
  tula: "Venus",
  vrischika: "Mars",
  dhanu: "Jupiter",
  makara: "Saturn",
  kumbha: "Saturn",
  meena: "Jupiter",
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

function normalizeSign(sign: string): string {
  return sign.trim().toLowerCase();
}

function normalizePlanetName(name: string): string {
  return name.trim().toLowerCase();
}

export function analyzeHouseLords(
  houses: House[],
  planets: Planet[]
) {
  return houses.map((house) => {
    const normalizedSign = normalizeSign(house.sign);

    const lord = SIGN_LORDS[normalizedSign] ?? null;

    const lordPosition = lord
      ? planets.find(
          (planet) =>
            normalizePlanetName(planet.planet) ===
            normalizePlanetName(lord)
        )
      : undefined;

    return {
      house: house.house,
      sign: house.sign,
      normalizedSign,
      lord,
      lordSign: lordPosition?.sign ?? null,
      lordPlacementHouse: lordPosition?.house ?? null,
      dataAvailable: Boolean(lord && lordPosition),
    };
  });
}