import { renderToBuffer } from "@react-pdf/renderer";
import {
  select,
  update,
  insert,
  uploadStorage,
} from "@/lib/server/db";

import { calculateChart } from "@/lib/astrology/engine";
import { generateReport } from "@/lib/ai/report";
import { buildReportHtml } from "@/lib/pdf/report-html";
import { createAstrologyPdfDocument } from "@/lib/pdf/astrology-pdf";
import type { BirthDetailsDraft } from "@/types";

const defaultPrompt = `
நீங்கள் ஒரு அனுபவமிக்க தமிழ் ஜோதிட அறிக்கை எழுத்தாளர்.

முக்கிய நோக்கம்:

Customer கொடுத்த பிறந்த தேதி, நேரம், இடம் மற்றும் astrology calculation data-வை
மட்டுமே அடிப்படையாகக் கொண்டு இயல்பான தமிழில் personalized report எழுத வேண்டும்.

Customer report படிக்கும் போது:

"இந்த report என்னைப் பற்றியே எழுதப்பட்டிருக்கிறது"

என்ற உணர்வு வர வேண்டும்.

ஒவ்வொரு section-லும் கிடைத்த calculation data-வுடன் தொடர்புடைய
personalized explanation கொடுக்கவும்.

Generic horoscope மாதிரி பொதுவான வரிகளை அதிகமாக பயன்படுத்த வேண்டாம்.

முக்கிய விதிகள்:

- Calculation data இல்லாத விஷயங்களை உருவாக்க வேண்டாம்.
- உறுதியான எதிர்கால உத்தரவாதங்களை கொடுக்க வேண்டாம்.
- மருத்துவம், சட்டம், முதலீடு போன்றவற்றில் definitive advice கொடுக்க வேண்டாம்.
- ஒரே விஷயத்தை மீண்டும் மீண்டும் எழுத வேண்டாம்.
- எளிய, இயல்பான தமிழ் பயன்படுத்தவும்.
- தேவையான இடங்களில் headings மற்றும் bullet points பயன்படுத்தவும்.
- Report முழுவதும் customer-specific interpretation இருக்க வேண்டும்.

முக்கிய விதி — CUSTOMER QUESTION:

Customer கேள்வி Tanglish, Tamil அல்லது English/mixed format-ல்
இருந்தாலும் அதன் உண்மையான பொருளை சரியாக புரிந்துகொள்ள வேண்டும்.

Customer கேட்ட கேள்வியின் meaning-ஐ மாற்றக்கூடாது.

உதாரணம்:

"eppo etam vankuven"

=

"எப்போது இடம் வாங்குவேன்?"

இங்கே "etam / edam" என்பது:

இடம் / நிலம் / plot / property

என்பதைக் குறிக்கிறது.

அதை "வாகனம்" என்று ஒருபோதும் புரிந்துகொள்ளக்கூடாது.

"eppo vehicle vanguven"

=

"எப்போது வாகனம் வாங்குவேன்?"

இரண்டும் வெவ்வேறு கேள்விகள்.

Customer கேட்ட கேள்விக்கு மட்டுமே பதில் அளிக்க வேண்டும்.

கேள்வி "எப்போது இடம் வாங்குவேன்?" என்றால்,
வாகனம் பற்றி எந்த விளக்கமும் கொடுக்கக்கூடாது.

இடம் / நிலம் / plot / property தொடர்பான கேள்வியாக இருந்தால்,
அதற்குப் பொருத்தமான ஜாதக காரணிகளை மட்டுமே பயன்படுத்தி
பதில் அளிக்க வேண்டும்.

Customer கேள்விக்கு முதலில் நேரடியான பதிலை வழங்க வேண்டும்.

பிறகு அந்த பதிலுக்கான ஜாதக காரணங்களை விளக்க வேண்டும்.

கணக்கீட்டுத் தரவு ஆதரிக்காத குறிப்பிட்ட தேதி,
மாதம் அல்லது வருடத்தை கற்பனை செய்து எழுதக்கூடாது.

Customer question-ன் topic-ஐ மாற்றக்கூடாது.

SERVICE:
{{SERVICE_SLUG}}

SERVICE-SPECIFIC INSTRUCTION:
{{SERVICE_INSTRUCTION}}
`;

const serviceInstructions: Record<string, string> = {
  "basic-jathagam": `
இது BASIC JATHAGAM.

இது customer-க்கு ஒரு நல்ல introductory horoscope report.

அதிக ஆழமான analysis-ஐ இங்கே கொடுக்க வேண்டாம்.

முக்கிய பகுதிகள்:

1. ராசி
2. நட்சத்திரம்
3. லக்னம்
4. முக்கிய கிரக நிலைகள்
5. பொதுவான குணநலன்
6. வாழ்க்கையின் பொதுவான திசை
7. சுருக்கமான முக்கிய குறிப்புகள்

Deep 12-house analysis, முழு Dasha analysis,
மிகவும் விரிவான career/marriage/finance prediction ஆகியவற்றை
Basic report-ல் முழுமையாக கொடுக்க வேண்டாம்.

Target length: approximately 6–8 pages when rendered as PDF.
`,

  "detailed-jathagam": `
இது DETAILED JATHAGAM.

Basic report-ஐ விட மிகவும் ஆழமான analysis கொடுக்க வேண்டும்.

முக்கியமாக:

- 12 வீடுகள்
- கிரகங்களின் பாவ நிலைகள்
- Vimshottari Dasha
- முக்கியமான காலகட்டங்கள்
- சாதகமான மற்றும் கவனிக்க வேண்டிய அம்சங்கள்
- தனிப்பட்ட guidance

Target length: approximately 18–22 pages.
`,

  "career-report": `
இது CAREER REPORT.

Career தொடர்பான analysis-க்கு முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- 10-ம் வீடு
- 10-ம் அதிபதி
- சனி
- குரு
- தொழில் தொடர்பான கிரக பலம்
- பொருத்தமான career themes
- வேலை மாற்றம் / வளர்ச்சி தொடர்பான காலகட்ட guidance

Marriage அல்லது finance போன்ற unrelated topics-ல்
நீண்ட analysis வேண்டாம்.

Target length: approximately 10–12 pages.
`,

  "marriage-report": `
இது MARRIAGE REPORT.

திருமணம் மற்றும் குடும்ப வாழ்க்கை தொடர்பான
analysis-க்கு முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- 7-ம் வீடு
- 7-ம் அதிபதி
- சுக்கிரன்
- செவ்வாய்
- திருமண timing தொடர்பான astrology indicators
- relationship compatibility themes
- குடும்ப வாழ்க்கை தொடர்பான guidance

Target length: approximately 10–14 pages.
`,

  "business-report": `
இது BUSINESS REPORT.

வணிகம் தொடர்பான astrology analysis மட்டும்
ஆழமாக இருக்க வேண்டும்.

முக்கியமாக:

- 7-ம் வீடு
- 10-ம் வீடு
- 11-ம் வீடு
- வணிக பாவங்கள்
- partnership themes
- business timing
- கவனிக்க வேண்டிய காலகட்டங்கள்

Guaranteed profit அல்லது guaranteed business success
என்று கூற வேண்டாம்.

Target length: approximately 10–12 pages.
`,

  "finance-report": `
இது FINANCE REPORT.

Financial themes தொடர்பான astrology analysis-க்கு
முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- 2-ம் வீடு
- 11-ம் வீடு
- பண வரவு
- சேமிப்பு
- கடன் தொடர்பான காலகட்டங்கள்
- financial caution periods

Specific investment recommendation அல்லது
guaranteed financial outcome கொடுக்க வேண்டாம்.

Target length: approximately 8–10 pages.
`,

  "yearly-prediction": `
இது YEARLY PREDICTION.

தற்போதைய வருடத்தை மையமாகக் கொண்டு
மாத வாரியான analysis கொடுக்கவும்.

முக்கியமாக:

- வருடத்தின் முக்கிய transit themes
- மாத வாரியான பலன்
- சாதகமான காலங்கள்
- கவனிக்க வேண்டிய காலங்கள்
- career, finance, family போன்ற முக்கிய themes-ன் short guidance

Target length: approximately 8–10 pages.
`,

  "compatibility-report": `
இது COMPATIBILITY REPORT.

இரண்டு நபர்களின் horoscope data இருந்தால் அவற்றை ஒப்பிட்டு
traditional compatibility analysis கொடுக்கவும்.

முக்கியமாக:

- 10 பொருத்தங்கள்
- compatibility strengths
- கவனிக்க வேண்டிய differences
- family/life compatibility
- overall interpretation

ஒரு simple score மட்டும் கொடுக்காமல் explanation கொடுக்கவும்.

Target length: approximately 10–12 pages.
`,

  "child-horoscope": `
இது CHILD HOROSCOPE.

குழந்தையின் chart-ஐ மையமாகக் கொண்டு:

- personality tendencies
- education themes
- talents/interests
- growth themes
- name-letter information, if calculation data supports it

Health பற்றி definitive medical prediction செய்ய வேண்டாம்.

Target length: approximately 8–10 pages.
`,

  "complete-life-report": `
இது COMPLETE LIFE REPORT.

இது மிகவும் comprehensive report.

முக்கியமாக:

- Lagna
- Rasi
- Nakshatra
- 12 houses
- planetary analysis
- Dasha
- career
- business
- marriage
- family
- finance
- property
- yearly outlook
- முக்கியமான காலகட்டங்கள்
- personalised overall guidance

ஒவ்வொரு முக்கிய life area-வும் போதுமான depth-ல் இருக்க வேண்டும்.

Target length: 30+ pages.
`,
};

function getServicePrompt(serviceSlug: string) {
  const instruction =
    serviceInstructions[serviceSlug] ??
    serviceInstructions["basic-jathagam"];

  return defaultPrompt
    .replace("{{SERVICE_SLUG}}", serviceSlug)
    .replace("{{SERVICE_INSTRUCTION}}", instruction);
}

export async function processPaidOrder(orderId: string) {
  // ---------------------------------------------------------
  // 1. GET ORDER
  // ---------------------------------------------------------

  const orders = await select("orders", { id: orderId }, 1);
  const order = orders[0];

  if (!order) {
    throw new Error("Order not found");
  }

  // ---------------------------------------------------------
  // 2. GET BIRTH DETAILS
  // ---------------------------------------------------------

  const births = await select(
    "birth_details",
    { id: String(order.birth_details_id) },
    1
  );

  // ---------------------------------------------------------
  // 3. GET CUSTOMER
  // ---------------------------------------------------------

  const customers = await select(
    "customers",
    { id: String(order.customer_id) },
    1
  );

  const b = births[0];
  const customer = customers[0];

  if (!b || !customer) {
    throw new Error("Order data incomplete");
  }

  // ---------------------------------------------------------
  // 4. PREPARE BIRTH DETAILS
  // ---------------------------------------------------------

  const birth: BirthDetailsDraft = {
    dob: String(b.dob ?? ""),

    birthTime: b.birth_time
      ? String(b.birth_time).slice(0, 5)
      : "",

    timeUnknown: Boolean(b.time_unknown),

    birthPlace: String(b.birth_place ?? ""),

    birthCountry: String(
      b.birth_country ?? "India"
    ),

    latitude:
      b.latitude !== null &&
      b.latitude !== undefined
        ? String(b.latitude)
        : "",

    longitude:
      b.longitude !== null &&
      b.longitude !== undefined
        ? String(b.longitude)
        : "",

    timeZone: String(
      b.time_zone ?? "Asia/Kolkata"
    ),
  };

  // ---------------------------------------------------------
  // 5. CALCULATING
  // ---------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "CALCULATING",
      updated_at: new Date().toISOString(),
    }
  );

  // ---------------------------------------------------------
  // 6. CALCULATE ASTROLOGY CHART
  // ---------------------------------------------------------

  const chart = await calculateChart(birth);

  // ---------------------------------------------------------
  // 7. SAVE ASTROLOGY CALCULATION
  // ---------------------------------------------------------

  await insert(
    "astrology_calculations",
    {
      order_id: order.id,

      input_data: birth,

      result_data: chart,

      status: "COMPLETED",

      error_message: null,

      completed_at:
        new Date().toISOString(),
    }
  );

  // ---------------------------------------------------------
  // 8. AI REPORT PENDING
  // ---------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "AI_REPORT_PENDING",
      updated_at: new Date().toISOString(),
    }
  );

  // ---------------------------------------------------------
  // 9. SERVICE SLUG
  // ---------------------------------------------------------

  const serviceSlug = String(
    order.service_slug ?? "basic-jathagam"
  );

  // IMPORTANT:
  // இங்கே defaultPrompt மட்டும் அனுப்பாமல்
  // service-specific prompt-ஐயும் சேர்க்கிறோம்.

  const finalPrompt =
    getServicePrompt(serviceSlug);

  // ---------------------------------------------------------
  // 10. GENERATE AI REPORT
  // ---------------------------------------------------------

  const report = await generateReport(
    {
      customer,

      birthDetails: birth,

      astrology: chart,

      serviceSlug,

      // IMPORTANT:
      // Customer கேட்ட original question AI-க்கு செல்கிறது.
      questions: order.questions,
    },

    finalPrompt
  );

  if (!report.text || !report.text.trim()) {
    throw new Error(
      "AI report generation returned empty content"
    );
  }

  // ---------------------------------------------------------
  // 11. SAVE AI REPORT
  // ---------------------------------------------------------

  const saved = await insert(
    "ai_reports",
    {
      order_id: order.id,

      prompt_version: 2,

      model: report.model,

      input_json: {
        birthDetails: birth,

        astrology: chart,

        serviceSlug,

        questions: order.questions,
      },

      output_text: report.text,
    }
  );

  // ---------------------------------------------------------
  // 12. AI REPORT COMPLETED
  // ---------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      report_id: saved.id,

      status: "AI_REPORT_COMPLETED",

      updated_at:
        new Date().toISOString(),
    }
  );

  // ---------------------------------------------------------
  // 13. BUILD HTML
  // ---------------------------------------------------------

  const html = buildReportHtml(
    "ஜாதகம் AI அறிக்கை",

    String(
      customer.full_name ?? "Customer"
    ),

    report.text,

    String(order.order_number)
  );

  // ---------------------------------------------------------
  // 14. PDF PENDING
  // ---------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "PDF_PENDING",

      updated_at:
        new Date().toISOString(),
    }
  );

  // ---------------------------------------------------------
// 15. GENERATE PDF DIRECTLY
// ---------------------------------------------------------

const pdfDocument = createAstrologyPdfDocument({
  customerName: String(customer.full_name ?? "Customer"),
  reportText: report.text,
  orderNumber: String(order.order_number),

  birthDate: birth.dob,
  birthTime: birth.birthTime,
  birthPlace: birth.birthPlace,

  rasi: String(chart.moonSign ?? ""),
  nakshatra: String(chart.nakshatra ?? ""),
  lagna: String(chart.ascendant ?? ""),

  question: String(order.questions ?? ""),
});

// Generate PDF
const pdfBuffer = await renderToBuffer(pdfDocument);

// Check PDF
if (!pdfBuffer || pdfBuffer.length === 0) {
  throw new Error(
    "PDF generation returned empty buffer"
  );
}

console.log(
  `PDF generated successfully for order ${order.order_number}. Size: ${pdfBuffer.length} bytes`
);

// ---------------------------------------------------------
// 16. UPLOAD PDF TO SUPABASE STORAGE
// ---------------------------------------------------------

const pdfPath =
  `${order.order_number}/${order.order_number}.pdf`;

await uploadStorage(
  "astrology-reports",
  pdfPath,
  pdfBuffer,
  "application/pdf"
);

console.log(
  `PDF uploaded successfully: ${pdfPath}`
);

// ---------------------------------------------------------
// 17. PDF COMPLETED
// ---------------------------------------------------------

await update(
  "orders",
  { id: String(order.id) },
  {
    status: "PDF_COMPLETED",
    updated_at: new Date().toISOString(),
  }
);

// ---------------------------------------------------------
// 18. RETURN
// ---------------------------------------------------------

return {
  orderId,

  orderNumber:
    String(order.order_number),

  html,

  pdfGenerated: true,

  pdfSize: pdfBuffer.length,

  pdfPath,
};
}