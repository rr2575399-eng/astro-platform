const SIGN_LORDS: Record<string, string> = {
  // Numeric Rashi indexes
  "0": "Mars",      // Aries
  "1": "Venus",     // Taurus
  "2": "Mercury",   // Gemini
  "3": "Moon",      // Cancer
  "4": "Sun",       // Leo
  "5": "Mercury",   // Virgo
  "6": "Venus",     // Libra
  "7": "Mars",      // Scorpio
  "8": "Jupiter",  // Sagittarius
  "9": "Saturn",   // Capricorn
  "10": "Saturn",  // Aquarius
  "11": "Jupiter", // Pisces

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

  // Tamil transliteration
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