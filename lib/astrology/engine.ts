import { BirthDetailsDraft } from "@/types";
import {
  getKundli,
  getAyanamsa,
} from "@ishubhamx/panchangam-js";

/* =========================================================
   TYPES
========================================================= */

export interface PlanetPosition {
  planet: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
  nakshatra?: string;
  pada?: number;
}

export interface HousePosition {
  house: number;
  sign: string;
}

export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
}

export interface AstrologyCalculation {
  ascendant: string;
  moonSign: string;
  nakshatra: string;
  pada: number;
  planets: PlanetPosition[];
  houses: HousePosition[];
  dashas: DashaPeriod[];
  ayanamsa?: number;
}

/* =========================================================
   RASHIS
========================================================= */

const RASHIS: string[] = [
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

/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value: unknown, fallback = 0): number {
  const n = Number(value);

  return Number.isFinite(n) ? n : fallback;
}

/* =========================================================
   SIGN FROM LONGITUDE
========================================================= */

function getSign(longitude: number): string {
  const normalized =
    ((safeNumber(longitude) % 360) + 360) % 360;

  const index = Math.floor(normalized / 30);

  return RASHIS[index] ?? "Mesha";
}

/* =========================================================
   DEGREE INSIDE SIGN
========================================================= */

function getDegree(longitude: number): number {
  const normalized =
    ((safeNumber(longitude) % 360) + 360) % 360;

  return Number((normalized % 30).toFixed(4));
}

/* =========================================================
   SAFE STRING
========================================================= */

function safeString(
  value: unknown,
  fallback = ""
): string {
  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return String(value);
  }

  return fallback;
}

/* =========================================================
   BIRTH DATE CREATOR
   Supports:
   YYYY-MM-DD
   DD-MM-YYYY
   DD/MM/YYYY
========================================================= */

function createBirthDate(birth: BirthDetailsDraft): Date {
  if (!birth) {
    throw new Error("Birth details are required");
  }

  // Accept either dob or date
 const rawDate = String(birth.dob ?? "").trim();

  if (!rawDate) {
    throw new Error("Birth date is required");
  }

  // Accept different possible time field names
  let rawTime = String(
    birth.birthTime ??
    (birth as any).time ??
    (birth as any).birth_time ??
    ""
  ).trim();

  // If customer says time is unknown, use 12:00 PM
  if (
    birth.timeUnknown === true ||
    !rawTime ||
    rawTime === "undefined" ||
    rawTime === "null"
  ) {
    rawTime = "12:00";
  }

  // Convert 12-hour time such as 2:30 PM
  const ampmMatch = rawTime.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (ampmMatch) {
    let hour = Number(ampmMatch[1]);
    const minute = Number(ampmMatch[2]);
    const period = ampmMatch[3].toUpperCase();

    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
      throw new Error(`Invalid birth time: ${rawTime}`);
    }

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    rawTime =
      `${String(hour).padStart(2, "0")}:` +
      `${String(minute).padStart(2, "0")}`;
  }

  // HH:mm format
  const timeMatch = rawTime.match(
    /^(\d{1,2}):(\d{2})$/
  );

  if (!timeMatch) {
    throw new Error(
      `Invalid birth time: ${rawTime}. Use HH:mm format.`
    );
  }

  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error(`Invalid birth time: ${rawTime}`);
  }

  // Convert DD/MM/YYYY to YYYY-MM-DD
  let formattedDate = rawDate;

  const indianDateMatch = rawDate.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  );

  if (indianDateMatch) {
    const day = indianDateMatch[1].padStart(2, "0");
    const month = indianDateMatch[2].padStart(2, "0");
    const year = indianDateMatch[3];

    formattedDate = `${year}-${month}-${day}`;
  }

  // Validate YYYY-MM-DD
  const dateMatch = formattedDate.match(
    /^(\d{4})-(\d{2})-(\d{2})$/
  );

  if (!dateMatch) {
    throw new Error(
      `Invalid birth date: ${rawDate}. Use YYYY-MM-DD or DD/MM/YYYY.`
    );
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);

  if (
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new Error(`Invalid birth date: ${rawDate}`);
  }

  // India timezone: IST +05:30
  const iso =
    `${year}-${String(month).padStart(2, "0")}-` +
    `${String(day).padStart(2, "0")}T` +
    `${String(hour).padStart(2, "0")}:` +
    `${String(minute).padStart(2, "0")}:00+05:30`;

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Invalid birth date/time: ${rawDate} ${rawTime}`
    );
  }

  return date;
}

/* =========================================================
   EXTRACT SIGN
========================================================= */

function extractSign(
  value: any,
  longitude = 0
): string {
  return (
    safeString(value?.rashiName) ||
    safeString(value?.sign) ||
    safeString(value?.rashi) ||
    getSign(longitude)
  );
}

/* =========================================================
   EXTRACT LONGITUDE
========================================================= */

function extractLongitude(
  data: any
): number {
  return safeNumber(
    data?.longitude ??
      data?.lon ??
      data?.degreeLongitude ??
      0
  );
}

/* =========================================================
   EXTRACT HOUSE NUMBER
========================================================= */

function extractHouseNumber(
  house: any,
  index: number
): number {
  return safeNumber(
    house?.number ??
      house?.house ??
      house?.houseNumber ??
      index + 1,
    index + 1
  );
}

/* =========================================================
   CALCULATE CHART
========================================================= */

export async function calculateChart(
  birthDetails: BirthDetailsDraft
): Promise<AstrologyCalculation> {

  /* =======================================================
     1. VALIDATE
  ======================================================= */

  if (!birthDetails) {
    throw new Error(
      "Birth details are required"
    );
  }

  /* =======================================================
     2. CREATE DATE SAFELY
  ======================================================= */

  const date = createBirthDate(
    birthDetails
  );

  /* =======================================================
     3. LATITUDE / LONGITUDE
  ======================================================= */

  const data = birthDetails as any;

  const latitude = safeNumber(
    data.latitude
  );

  const longitude = safeNumber(
    data.longitude
  );

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    throw new Error(
      "Invalid latitude or longitude"
    );
  }

  if (
    latitude < -90 ||
    latitude > 90
  ) {
    throw new Error(
      "Latitude must be between -90 and 90"
    );
  }

  if (
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error(
      "Longitude must be between -180 and 180"
    );
  }

  /* =======================================================
     4. ASTRONOMY ENGINE OBSERVER

     height is REQUIRED
  ======================================================= */

  const observer: any = {
    latitude,
    longitude,
    height: 0,
  };

  /* =======================================================
     5. AYANAMSA

     Cast is used because package typings can differ
     between versions.
  ======================================================= */

  const ayanamsa = safeNumber(
    (getAyanamsa as any)(date),
    0
  );

  /* =======================================================
     6. KUNDLI

     Package typings differ in some versions.
     Runtime object is handled safely.
  ======================================================= */

  const kundli: any =
    (getKundli as any)(
      date,
      observer,
      {
        houseSystem:
          "whole_sign",
      }
    );

  /* =======================================================
     7. ASCENDANT
  ======================================================= */

  const ascendant =
    safeString(
      kundli?.ascendant?.rashiName
    ) ||
    safeString(
      kundli?.ascendant?.sign
    ) ||
    safeString(
      kundli?.ascendant
    ) ||
    "Mesha";

  /* =======================================================
     8. MOON
  ======================================================= */

  const moon =
    kundli?.planets?.Moon ??
    kundli?.planets?.moon ??
    null;

  const moonLongitude =
    extractLongitude(moon);

  const moonSign =
    extractSign(
      moon,
      moonLongitude
    );

  const nakshatra =
    safeString(
      moon?.nakshatra
    ) ||
    safeString(
      moon?.nakshatraName
    ) ||
    "";

  const pada = safeNumber(
    moon?.pada ??
      moon?.nakshatraPada ??
      0
  );

  /* =======================================================
     9. PLANETS
  ======================================================= */

  const planets: PlanetPosition[] =
    [];

  const planetObject =
    kundli?.planets ?? {};

  for (
    const [planetName, planetData] of Object.entries(
      planetObject
    ) as [string, any][]
  ) {

    const planetLongitude =
      extractLongitude(
        planetData
      );

    const sign =
      extractSign(
        planetData,
        planetLongitude
      );

    const degree =
      Number.isFinite(
        Number(planetData?.degree)
      )
        ? Number(
            planetData.degree
          )
        : getDegree(
            planetLongitude
          );

    const planetNakshatra =
      safeString(
        planetData?.nakshatra
      ) ||
      safeString(
        planetData?.nakshatraName
      ) ||
      "";

    const planetPada =
      safeNumber(
        planetData?.pada ??
          planetData?.nakshatraPada ??
          0
      );

    /* -----------------------------------------
       Find house
    ----------------------------------------- */

    const housesRaw =
      Array.isArray(
        kundli?.houses
      )
        ? kundli.houses
        : [];

    let houseNumber = 0;

    const foundHouse =
      housesRaw.find(
        (house: any) => {

          const start =
            safeNumber(
              house?.startLongitude
            );

          const end =
            safeNumber(
              house?.endLongitude
            );

          if (
            start === 0 &&
            end === 0
          ) {
            return false;
          }

          if (start < end) {
            return (
              planetLongitude >= start &&
              planetLongitude < end
            );
          }

          return (
            planetLongitude >= start ||
            planetLongitude < end
          );
        }
      );

    if (foundHouse) {
      houseNumber =
        extractHouseNumber(
          foundHouse,
          housesRaw.indexOf(
            foundHouse
          )
        );
    }

    /* -----------------------------------------
       Whole-sign fallback
    ----------------------------------------- */

    if (
      houseNumber === 0
    ) {
      const ascendantIndex =
        Math.max(
          0,
          RASHIS.indexOf(
            ascendant
          )
        );

      const planetSignIndex =
        Math.floor(
          ((planetLongitude % 360) +
            360) %
            360 /
            30
        );

      houseNumber =
        ((planetSignIndex -
          ascendantIndex +
          12) %
          12) +
        1;
    }

    const retrograde =
      Boolean(
        planetData?.isRetrograde ??
          planetData?.retrograde ??
          false
      );

    planets.push({
      planet: planetName,
      sign,
      degree,
      house: houseNumber,
      retrograde,
      nakshatra:
        planetNakshatra,
      pada:
        planetPada,
    });
  }

  /* =======================================================
     10. HOUSES

     Always return HousePosition[]
  ======================================================= */

  const houses: HousePosition[] =
    [];

  const housesRaw =
    Array.isArray(
      kundli?.houses
    )
      ? kundli.houses
      : [];

  housesRaw.forEach(
    (house: any, index: number) => {

      const houseNumber =
        extractHouseNumber(
          house,
          index
        );

      const startLongitude =
        safeNumber(
          house?.startLongitude ??
            house?.longitude ??
            0
        );

      const sign =
        extractSign(
          house,
          startLongitude
        );

      houses.push({
        house:
          houseNumber,
        sign,
      });
    }
  );

  /* -----------------------------------------
     If package doesn't return houses,
     create 12 whole-sign houses.
  ----------------------------------------- */

  if (
    houses.length === 0
  ) {

    const ascendantIndex =
      Math.max(
        0,
        RASHIS.indexOf(
          ascendant
        )
      );

    for (
      let i = 0;
      i < 12;
      i++
    ) {

      const sign =
        RASHIS[
          (ascendantIndex + i) %
            12
        ];

      houses.push({
        house: i + 1,
        sign,
      });
    }
  }

  /* =======================================================
     11. DASHA

     Always return DashaPeriod[]
     Never return null
  ======================================================= */

  const dashas: DashaPeriod[] =
    [];

  const dashaRaw =
    kundli?.dasha;

  if (
    Array.isArray(
      dashaRaw
    )
  ) {

    dashaRaw.forEach(
      (item: any) => {

        dashas.push({
          planet:
            safeString(
              item?.planet ??
                item?.name ??
                item?.lord
            ),

          startDate:
            safeString(
              item?.startDate ??
                item?.start ??
                ""
            ),

          endDate:
            safeString(
              item?.endDate ??
                item?.end ??
                ""
            ),
        });
      }
    );
  }

  /* =======================================================
     12. FINAL RESULT
  ======================================================= */

  return {
    ascendant,
    moonSign,
    nakshatra,
    pada,
    planets,
    houses,
    dashas,
    ayanamsa,
  };
}