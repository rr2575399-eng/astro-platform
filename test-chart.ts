// test-chart.ts
import { calculateChart } from './lib/astrology/engine';

const birth = {
  dob: "2005-12-02",
  birthTime: "13:45",
  timeUnknown: false,
  birthPlace: "Thanjavur, Tamil Nadu",
  birthCountry: "India",
  latitude: "10.7905",
  longitude: "79.1378",
  timeZone: "Asia/Kolkata"
};

async function test() {
  console.log("=== TEST START ===");

  try {
    const chart = await calculateChart(birth);

    console.log("\n=== CHART RESULT ===");
    console.log("Ascendant (லக்னம்)  :", chart.ascendant);
    console.log("Moon Sign (ராசி)    :", chart.moonSign);
    console.log("Nakshatra (நட்சத்திரம்):", chart.nakshatra);
    console.log("Pada (பாதம்)        :", chart.pada);
    console.log("Ayanamsa            :", chart.ayanamsa);

    console.log("\n=== PLANETS ===");
    chart.planets?.forEach(p => {
      console.log(
        `${p.planet.padEnd(12)}: ${p.sign.padEnd(15)} ${String(p.degree).padEnd(8)}° | House: ${p.house} | Retro: ${p.retrograde}`
      );
    });

    console.log("\n=== HOUSES ===");
    chart.houses?.forEach(h => {
      console.log(`House ${h.house}: ${h.sign}`);
    });

    console.log("\n=== DASHA ===");
    if (chart.dashas && chart.dashas.length > 0) {
      chart.dashas.forEach(d => {
        console.log(`${d.planet.padEnd(12)}: ${d.startDate} → ${d.endDate}`);
      });
    } else {
      console.log("⚠️  Dasha empty — Library return செய்யவில்லை!");
    }

    console.log("\n=== TEST COMPLETE ✅ ===");

  } catch (error: any) {
    console.error("\n❌ ERROR:", error.message);
    console.error(error.stack);
  }
}

test();