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

// ============================================================
// CUSTOMER QUESTION FORMATTER
// ============================================================

function formatQuestion(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// ============================================================
// DEFAULT AI PROMPT
// ============================================================

const defaultPrompt = `
நீங்கள் ஒரு அனுபவமிக்க தமிழ் ஜோதிட அறிக்கை எழுத்தாளர்.

உங்கள் முக்கிய வேலை:

Customer கொடுத்த:
1. பிறந்த விவரங்கள்
2. Astrology calculation data
3. Customer கேட்ட கேள்வி
4. Selected service

ஆகியவற்றை மட்டும் அடிப்படையாகக் கொண்டு
PERSONALIZED ஜாதக அறிக்கை உருவாக்க வேண்டும்.

Customer report-ஐ படிக்கும் போது:

"இந்த report என்னைப் பற்றியே எழுதப்பட்டிருக்கிறது"

என்று உணர வேண்டும்.

==================================================
1. CUSTOMER QUESTION LOCK
==================================================

Customer கேட்ட கேள்வியே PRIMARY TOPIC.

முதலில் customer question-ன் உண்மையான meaning-ஐ கண்டறிய வேண்டும்.

Customer question-ன் topic-ஐ மாற்றக்கூடாது.

Tanglish examples:

"eppo velaikku poven"
→ "நான் எப்போது வேலைக்கு போவேன்?"
→ TOPIC = வேலை / Career / Employment

"eppo vehicle vanguven"
→ "நான் எப்போது வாகனம் வாங்குவேன்?"
→ TOPIC = Vehicle

"eppo veedu kattuven"
→ "நான் எப்போது வீடு கட்டுவேன்?"
→ TOPIC = House / Property

"eppo edam vanguven"
→ "நான் எப்போது இடம் வாங்குவேன்?"
→ TOPIC = Land / Plot / Property

IMPORTANT:

"edam / etam" என்றால் இந்த context-ல்
நிலம் / இடம் / Plot / Property.

அதை Vehicle என்று interpret செய்யக்கூடாது.

"eppo kalyanam aagum"
→ "எப்போது திருமணம் ஆகும்?"
→ TOPIC = Marriage

"eppo business start pannuven"
→ "எப்போது business தொடங்குவேன்?"
→ TOPIC = Business

==================================================
2. TOPIC DRIFT STRICTLY PROHIBITED
==================================================

Customer கேட்ட topic-க்கு unrelated topics-ஐ
main report analysis ஆக மாற்றக்கூடாது.

Example:

Customer:
"எப்போது வேலைக்கு போவேன்?"

Relevant:
- Career
- Employment
- 10-ம் வீடு
- 10-ம் அதிபதி
- career-related planets
- relevant dasha/transit, if calculation data supports it
- job opportunity
- career growth

Do NOT make these the main answer:
- Marriage
- Vehicle
- Property
- Children
- Foreign travel
- unrelated finance

ஒரு astrology factor வேறு life area-க்கும் தொடர்புடையதாக இருந்தாலும்,
customer question-க்கு தேவையான அளவில் மட்டும் குறிப்பிடவும்.

==================================================
3. CALCULATION DATA LOCK
==================================================

மிக முக்கியம்:

கிடைத்துள்ள astrology calculation data-க்கு வெளியே
எந்த astrology fact-ஐயும் உருவாக்கக்கூடாது.

கற்பனை செய்து எழுதக்கூடாதவை:

- Planet position
- Planet degree
- House placement
- House lord
- Dasha
- Bhukti
- Nakshatra
- Pada
- Yoga
- Dosha
- Transit
- Exact timing
- Exact date
- Exact month
- Exact year

ஒரு தகவல் calculation data-ல் இல்லையெனில்:

"கிடைத்துள்ள கணக்கீட்டுத் தரவின் அடிப்படையில்
இந்த தகவலை துல்லியமாகக் குறிப்பிட முடியாது."

என்று சொல்லவும்.

ஒருபோதும் missing data-ஐ guess செய்ய வேண்டாம்.

==================================================
4. DIRECT ANSWER FIRST
==================================================

Customer question-க்கு முதலில் நேரடியான பதில் கொடுக்க வேண்டும்.

பிறகு explanation.

Answer order:

1. முக்கிய பதில்
2. ஜாதக காரணங்கள்
3. Customer-specific analysis
4. காலகட்ட guidance
5. Practical guidance
6. Final conclusion

Customer கேட்ட கேள்விக்கான answer report-ல் தெளிவாக
காணக்கூடியதாக இருக்க வேண்டும்.

==================================================
5. TIMING RULE
==================================================

Calculation data தெளிவாக support செய்யாத:

- தேதி
- மாதம்
- வருடம்
- குறிப்பிட்ட காலகட்டம்

எதையும் உருவாக்கக்கூடாது.

Timing data இல்லையெனில்:

"கிடைத்துள்ள கணக்கீட்டுத் தரவின் அடிப்படையில்
துல்லியமான மாதம்/வருடத்தை உறுதியாகக் குறிப்பிட முடியாது."

என்று கூறவும்.

False precision வேண்டாம்.

==================================================
6. PERSONALIZATION
==================================================

Generic horoscope மாதிரி எழுதக்கூடாது.

Available data-ஐ பயன்படுத்தி explanation கொடுக்கவும்:

- Customer name
- DOB
- Birth time
- Birth place
- Lagna
- Rasi
- Nakshatra
- Pada
- Planet positions
- Houses
- Dashas
- Customer question

Customer-specific connection தெளிவாக இருக்க வேண்டும்.

==================================================
7. LANGUAGE
==================================================

எளிய, இயல்பான, மரியாதையான தமிழ்.

Customer Tanglish-ல் கேட்டாலும்
final report நல்ல தமிழில் இருக்கலாம்.

தேவையான astrology technical terms மட்டும் பயன்படுத்தவும்.

மிகவும் கடினமான தமிழ் வேண்டாம்.

==================================================
8. NO FILLER
==================================================

Page count அதிகரிக்க generic filler எழுதக்கூடாது.

ஒரே கருத்தை வேறு வார்த்தைகளில் மீண்டும் எழுதக்கூடாது.

ஒவ்வொரு section-லும் புதிய useful information இருக்க வேண்டும்.

Customer-க்கு பயன்படாத generic paragraphs வேண்டாம்.

==================================================
9. REPORT STRUCTURE
==================================================

Report structure:

முக்கிய பதில்

ஜாதக காரணங்கள்

தனிப்பட்ட பகுப்பாய்வு

காலகட்ட வழிகாட்டுதல்

முக்கிய குறிப்புகள்

Practical Guidance

இறுதி ஆலோசனை

Selected service instruction-ல்
கூறப்பட்ட additional sections-ஐயும் சேர்க்கவும்.

==================================================
10. SAFETY
==================================================

ஜோதிடத்தை guidance / interpretation ஆக மட்டுமே வழங்கவும்.

Guaranteed future outcome கொடுக்க வேண்டாம்.

"100% நடக்கும்"
"நிச்சயம் நடக்கும்"
"கண்டிப்பாக நடக்கும்"

போன்ற certainty language தவிர்க்கவும்.

Medical, legal, investment matters-ல்
definitive advice கொடுக்க வேண்டாம்.

==================================================
11. QUALITY STANDARD
==================================================

ஒவ்வொரு report-லும்:

- Customer question clearly answered
- Astrology data பயன்படுத்தப்பட்டுள்ளது
- Personalization உள்ளது
- Relevant reasoning உள்ளது
- Unsupported facts இல்லை
- Repetition இல்லை
- Topic drift இல்லை
- Practical guidance உள்ளது
- Clear conclusion உள்ளது

இருக்க வேண்டும்.

==================================================

SERVICE:
{{SERVICE_SLUG}}

SERVICE-SPECIFIC INSTRUCTION:
{{SERVICE_INSTRUCTION}}
`;

// ============================================================
// SERVICE INSTRUCTIONS
// ============================================================

const serviceInstructions: Record<string, string> = {
  "basic-jathagam": `
இது BASIC JATHAGAM.

இது customer-க்கு introductory personalized horoscope report.

முக்கிய பகுதிகள்:

1. Birth details
2. Lagna
3. Rasi
4. Nakshatra
5. Pada, if available
6. Major planetary information
7. Personality tendencies
8. General life direction
9. Strengths
10. Important caution areas
11. Customer question-க்கு short personalized answer
12. Final summary

Deep 12-house analysis மற்றும் full Dasha analysis வேண்டாம்.

Career, marriage, finance போன்ற topics
customer question-க்கு தொடர்பு இருந்தால் மட்டுமே
சுருக்கமாக குறிப்பிடவும்.

Target length:
approximately 5–7 pages when rendered as PDF.
`,

  "career-report": `
இது CAREER REPORT.

Career / Employment / Job தொடர்பான analysis-க்கு
முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- Career personality
- 10-ம் வீடு
- 10-ம் அதிபதி, if calculation data supports it
- Career-related planets
- Job / employment tendency
- Career strengths
- Career challenges
- Growth opportunities
- Job change indicators
- Relevant timing, only if supported
- Customer question
- Practical career guidance

Marriage அல்லது unrelated topics-ல்
நீண்ட analysis வேண்டாம்.

Target length:
approximately 8–10 pages.
`,

  "finance-report": `
இது FINANCE REPORT.

Financial themes-க்கு முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- 2-ம் வீடு
- 11-ம் வீடு
- Relevant lords, if available
- Income tendencies
- Savings
- Financial strengths
- Financial challenges
- Debt-related caution, if supported
- Relevant periods, if supported
- Customer question
- Practical financial discipline

Investment guarantee அல்லது specific investment recommendation வேண்டாம்.

Target length:
approximately 8–10 pages.
`,

  "marriage-report": `
இது MARRIAGE REPORT.

Marriage மற்றும் relationship life-ஐ மையமாகக் கொள்ளவும்.

முக்கியமாக:

- 7-ம் வீடு
- 7-ம் அதிபதி, if available
- Venus
- Mars
- Relationship tendencies
- Partner-related themes
- Marriage timing indicators, if supported
- Strengths
- Challenges
- Family-related themes
- Customer question
- Practical guidance

Target length:
approximately 9–12 pages.
`,

  "compatibility-report": `
இது COMPATIBILITY REPORT.

இரண்டு நபர்களின் chart data இருந்தால்
இருவரையும் ஒப்பிட்டு analysis செய்யவும்.

முக்கியமாக:

- Person A chart
- Person B chart
- Rasi
- Nakshatra
- 10 Poruthams, if calculation data provides them
- Compatibility strengths
- Emotional compatibility
- Communication
- Family/life compatibility
- Differences
- Caution areas
- Overall interpretation
- Practical relationship guidance

Simple score மட்டும் கொடுக்காமல் explanation கொடுக்கவும்.

Missing second-person data இருந்தால் அதை உருவாக்க வேண்டாம்.

Target length:
approximately 8–10 pages.
`,

  "child-horoscope": `
இது CHILD HOROSCOPE.

குழந்தையின் chart-ஐ மையமாகக் கொண்டு:

- Personality tendencies
- Learning style
- Education themes
- Talents
- Interests
- Strengths
- Growth themes
- Parent support guidance
- Name-letter information, only if calculation data supports it
- Customer question
- Final guidance

Health பற்றி medical prediction செய்ய வேண்டாம்.

Target length:
approximately 7–9 pages.
`,

  "business-report": `
இது BUSINESS REPORT.

Business / Entrepreneurship தொடர்பான analysis-க்கு
முக்கியத்துவம் கொடுக்கவும்.

முக்கியமாக:

- Entrepreneurial personality
- 7-ம் வீடு
- 10-ம் வீடு
- 11-ம் வீடு
- Relevant lords, if available
- Business strengths
- Business challenges
- Partnership themes
- Growth themes
- Business timing, only if supported
- Customer question
- Practical business guidance

Guaranteed profit அல்லது guaranteed success என்று கூற வேண்டாம்.

Target length:
approximately 9–12 pages.
`,

  "property-report": `
இது PROPERTY / LAND / HOUSE REPORT.

Property-related customer questions-க்கு
முக்கியத்துவம் கொடுக்கவும்.

"edam / etam" என்றால்:
நிலம் / இடம் / Plot / Property.

அதை Vehicle என்று interpret செய்யக்கூடாது.

முக்கியமாக:

- 4-ம் வீடு
- 4-ம் அதிபதி, if available
- Property-related planetary factors
- Land / Plot themes
- House purchase
- House construction
- Property-related obstacles, if supported
- Relevant timing, only if supported
- Exact customer question
- Practical guidance

Legal property advice கொடுக்க வேண்டாம்.

Target length:
approximately 9–12 pages.
`,

  "yearly-prediction": `
இது YEARLY PREDICTION.

Selected year-ஐ மையமாகக் கொண்டு analysis கொடுக்கவும்.

முக்கியமாக:

- Year overview
- Major themes
- Career
- Finance
- Family
- Relationship
- Property, only if relevant
- Important periods
- Month-wise guidance ONLY if the provided
  calculation/transit data supports it
- Favorable periods
- Caution periods
- Customer question
- Practical guidance
- Final summary

Unsupported month/date/year உருவாக்க வேண்டாம்.

Target length:
approximately 10–13 pages.
`,

  "detailed-jathagam": `
இது DETAILED JATHAGAM.

Basic report-ஐ விட மிகவும் ஆழமான personalized analysis.

முக்கியமாக:

1. Birth details
2. Lagna
3. Rasi
4. Nakshatra
5. Pada
6. Planetary analysis
7. 12 houses
8. House lords
9. Relevant combinations, only if supported
10. Vimshottari Dasha
11. Bhukti
12. Important periods
13. Personality
14. Education
15. Career
16. Business
17. Finance
18. Marriage
19. Family
20. Property
21. Customer question
22. Strengths
23. Challenges
24. Practical guidance
25. Final personalized summary

Do not invent missing Dasha or house data.

Target length:
approximately 13–16 pages.
`,

  "complete-life-report": `
இது COMPLETE LIFE REPORT.

இது PREMIUM மற்றும் COMPREHENSIVE report.

Customer-க்கு இந்த report
"என்னைப் பற்றியே முழுமையாக analyse செய்திருக்கிறார்கள்"
என்ற feeling வர வேண்டும்.

முக்கியமாக:

1. Premium introduction
2. Complete birth details
3. Lagna
4. Rasi
5. Nakshatra
6. Pada
7. Planetary analysis
8. 12 houses
9. House lords
10. Relevant combinations, if supported
11. Dasha
12. Bhukti
13. Major life periods
14. Personality
15. Education
16. Career
17. Business
18. Finance
19. Property
20. Marriage
21. Family
22. Children
23. Customer's exact question
24. Strengths
25. Challenges
26. Practical guidance
27. Overall life interpretation
28. Final personalized summary

Customer question answer report-ல்
strongly visible ஆக இருக்க வேண்டும்.

ஒவ்வொரு section-லும் meaningful information இருக்க வேண்டும்.

Page count அதிகரிக்க filler அல்லது repetition பயன்படுத்தக்கூடாது.

Promotion / upsell இருந்தால் மிகச் சிறிய final section-ஆக மட்டும் இருக்க வேண்டும்.

Target length:
approximately 18–24 pages.
`,
};

// ============================================================
// GET SERVICE PROMPT
// ============================================================

function getServicePrompt(serviceSlug: string) {
  const instruction =
    serviceInstructions[serviceSlug] ??
    serviceInstructions["basic-jathagam"];

  return defaultPrompt
    .replace("{{SERVICE_SLUG}}", serviceSlug)
    .replace("{{SERVICE_INSTRUCTION}}", instruction);
}

// ============================================================
// PROCESS PAID ORDER
// ============================================================

export async function processPaidOrder(orderId: string) {
  // ----------------------------------------------------------
  // 1. GET ORDER
  // ----------------------------------------------------------

  const orders = await select(
    "orders",
    { id: orderId },
    1
  );

  const order = orders[0];

  if (!order) {
    throw new Error("Order not found");
  }

  // ----------------------------------------------------------
  // 2. GET BIRTH DETAILS
  // ----------------------------------------------------------

  const births = await select(
    "birth_details",
    {
      id: String(order.birth_details_id),
    },
    1
  );

  // ----------------------------------------------------------
  // 3. GET CUSTOMER
  // ----------------------------------------------------------

  const customers = await select(
    "customers",
    {
      id: String(order.customer_id),
    },
    1
  );

  const b = births[0];
  const customer = customers[0];

  if (!b || !customer) {
    throw new Error("Order data incomplete");
  }

  // ----------------------------------------------------------
  // 4. PREPARE BIRTH DETAILS
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 5. CALCULATING
  // ----------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "CALCULATING",
      updated_at: new Date().toISOString(),
    }
  );

  // ----------------------------------------------------------
  // 6. CALCULATE ASTROLOGY CHART
  // ----------------------------------------------------------

  const chart = await calculateChart(birth);

  // ----------------------------------------------------------
  // 7. SAVE ASTROLOGY CALCULATION
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 8. AI REPORT PENDING
  // ----------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "AI_REPORT_PENDING",
      updated_at: new Date().toISOString(),
    }
  );

  // ----------------------------------------------------------
  // 9. SERVICE SLUG
  // ----------------------------------------------------------

  const serviceSlug = String(
    order.service_slug ?? "basic-jathagam"
  );

  // ----------------------------------------------------------
  // 10. FINAL AI PROMPT
  // ----------------------------------------------------------

  const finalPrompt =
    getServicePrompt(serviceSlug);

  // ----------------------------------------------------------
  // 11. GENERATE AI REPORT
  // ----------------------------------------------------------

  const report = await generateReport(
    {
      customer,

      birthDetails: birth,

      astrology: chart,

      serviceSlug,

      questions: order.questions,
    },

    finalPrompt
  );

  if (!report.text || !report.text.trim()) {
    throw new Error(
      "AI report generation returned empty content"
    );
  }

  // ----------------------------------------------------------
  // 12. SAVE AI REPORT
  // ----------------------------------------------------------

  const saved = await insert(
    "ai_reports",
    {
      order_id: order.id,

      prompt_version: 3,

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

  // ----------------------------------------------------------
  // 13. AI REPORT COMPLETED
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 14. BUILD HTML
  // ----------------------------------------------------------

  const html = buildReportHtml(
    "தமிழ் ஜோதிடம்",

    String(
      customer.full_name ?? "Customer"
    ),

    report.text,

    String(order.order_number)
  );

  // ----------------------------------------------------------
  // 15. PDF PENDING
  // ----------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "PDF_PENDING",

      updated_at:
        new Date().toISOString(),
    }
  );

  // ----------------------------------------------------------
  // 16. PREPARE CUSTOMER QUESTION
  // ----------------------------------------------------------

  const customerQuestion =
    formatQuestion(order.questions);

  // ----------------------------------------------------------
  // 17. CREATE PDF DOCUMENT
  // ----------------------------------------------------------

  const pdfDocument =
    createAstrologyPdfDocument({
      customerName: String(
        customer.full_name ?? "Customer"
      ),

      reportText: report.text,

      orderNumber: String(
        order.order_number
      ),

      birthDate: birth.dob,

      birthTime: birth.birthTime,

      birthPlace: birth.birthPlace,

      rasi: String(
        chart.moonSign ?? ""
      ),

      nakshatra: String(
        chart.nakshatra ?? ""
      ),

      lagna: String(
        chart.ascendant ?? ""
      ),

      question: customerQuestion,
    });

  // ----------------------------------------------------------
  // 18. GENERATE PDF
  // ----------------------------------------------------------

  const pdfBuffer =
    await renderToBuffer(pdfDocument);

  if (
    !pdfBuffer ||
    pdfBuffer.length === 0
  ) {
    throw new Error(
      "PDF generation returned empty buffer"
    );
  }

  console.log(
    `PDF generated successfully for order ${order.order_number}. Size: ${pdfBuffer.length} bytes`
  );

  // ----------------------------------------------------------
  // 19. UPLOAD PDF TO SUPABASE STORAGE
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 20. PDF COMPLETED
  // ----------------------------------------------------------

  await update(
    "orders",
    { id: String(order.id) },
    {
      status: "PDF_COMPLETED",

      updated_at:
        new Date().toISOString(),
    }
  );

  // ----------------------------------------------------------
  // 21. RETURN
  // ----------------------------------------------------------

  return {
    orderId,

    orderNumber:
      String(order.order_number),

    html,

    pdfGenerated: true,

    pdfSize:
      pdfBuffer.length,

    pdfPath,
  };
}