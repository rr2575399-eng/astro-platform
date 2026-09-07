import path from "path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "NotoTamil",
  src: path.join(
    process.cwd(),
    "public",
    "fonts",
    "NotoSansTamil-Regular.ttf"
  ),
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 48,
    paddingHorizontal: 42,
    fontFamily: "NotoTamil",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#252525",
  },

  coverPage: {
    padding: 0,
    fontFamily: "NotoTamil",
    backgroundColor: "#FFF9F0",
  },

  coverTop: {
    height: 175,
    backgroundColor: "#7A1F1F",
    paddingHorizontal: 42,
    paddingTop: 52,
  },

  coverBrand: {
    fontSize: 14,
    color: "#F4D58D",
    textAlign: "center",
    marginBottom: 17,
  },

  coverTitle: {
    fontSize: 29,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },

  coverSubTitle: {
    fontSize: 11,
    color: "#F7E7C0",
    textAlign: "center",
  },

  coverBody: {
    paddingHorizontal: 42,
    paddingTop: 52,
  },

  coverName: {
    fontSize: 22,
    textAlign: "center",
    color: "#7A1F1F",
    marginBottom: 24,
  },

  coverQuestionBox: {
    borderWidth: 1,
    borderColor: "#D4AF64",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  coverQuestionLabel: {
    fontSize: 10,
    color: "#8A6A2F",
    marginBottom: 8,
    textAlign: "center",
  },

  coverQuestion: {
    fontSize: 15,
    color: "#222222",
    textAlign: "center",
    lineHeight: 1.7,
  },

  coverFooter: {
    position: "absolute",
    bottom: 35,
    left: 42,
    right: 42,
    textAlign: "center",
    fontSize: 8,
    color: "#777777",
  },

  header: {
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D4AF64",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 11,
    color: "#7A1F1F",
  },

  headerOrder: {
    fontSize: 8,
    color: "#777777",
  },

  sectionTitle: {
    fontSize: 18,
    color: "#7A1F1F",
    marginBottom: 12,
  },

  sectionSubTitle: {
    fontSize: 10,
    color: "#8A6A2F",
    marginBottom: 14,
    lineHeight: 1.6,
  },

  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  profileCard: {
    width: "48%",
    marginBottom: 10,
    marginRight: "2%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1D3B8",
    borderRadius: 8,
    backgroundColor: "#FFFDF8",
  },

  profileLabel: {
    fontSize: 8,
    color: "#8A6A2F",
    marginBottom: 4,
  },

  profileValue: {
    fontSize: 11,
    color: "#222222",
  },

  questionBox: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#FFF7E8",
    borderWidth: 1,
    borderColor: "#D4AF64",
    marginBottom: 16,
  },

  questionLabel: {
    fontSize: 9,
    color: "#8A6A2F",
    marginBottom: 7,
  },

  questionText: {
    fontSize: 14,
    color: "#222222",
    lineHeight: 1.7,
  },

  answerBox: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#FFFDF8",
    borderWidth: 1,
    borderColor: "#DCCBAA",
    marginBottom: 16,
  },

  answerLabel: {
    fontSize: 12,
    color: "#7A1F1F",
    marginBottom: 9,
  },

  answerText: {
    fontSize: 12,
    color: "#222222",
    lineHeight: 1.8,
  },

  reportSection: {
    marginBottom: 15,
  },

  reportHeading: {
    fontSize: 13,
    color: "#7A1F1F",
    marginTop: 8,
    marginBottom: 7,
  },

  paragraph: {
    fontSize: 10,
    color: "#333333",
    marginBottom: 7,
    lineHeight: 1.7,
  },

  bullet: {
    fontSize: 10,
    color: "#333333",
    marginBottom: 5,
    paddingLeft: 8,
    lineHeight: 1.65,
  },

  noteBox: {
    marginTop: 14,
    padding: 14,
    backgroundColor: "#F8F1E4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2D3B5",
  },

  noteTitle: {
    fontSize: 11,
    color: "#7A1F1F",
    marginBottom: 6,
  },

  noteText: {
    fontSize: 9,
    color: "#555555",
    lineHeight: 1.6,
  },

  /* ========================================================= */
  /* PROFESSIONAL SALES CARDS */
  /* ========================================================= */

  productCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8C59C",
    backgroundColor: "#FFFDF8",
  },

  productCardPremium: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4AF64",
    backgroundColor: "#FFF7E8",
  },

  productTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  productName: {
    fontSize: 11,
    color: "#7A1F1F",
    maxWidth: "78%",
  },

  productText: {
    fontSize: 8.5,
    color: "#444444",
    lineHeight: 1.5,
    marginBottom: 5,
  },

  productPrice: {
    fontSize: 13,
    color: "#7A1F1F",
  },

  productCta: {
    fontSize: 8,
    color: "#8A6A2F",
    marginTop: 3,
  },

  premiumLabel: {
    fontSize: 8,
    color: "#8A6A2F",
    marginBottom: 4,
  },

  /* ========================================================= */
  /* FINAL */
  /* ========================================================= */

  finalBox: {
    marginTop: 35,
    padding: 22,
    borderRadius: 12,
    backgroundColor: "#7A1F1F",
  },

  finalTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  finalText: {
    fontSize: 10,
    color: "#F8EBD0",
    textAlign: "center",
    lineHeight: 1.7,
  },

  finalCta: {
    marginTop: 20,
    padding: 14,
    borderRadius: 9,
    backgroundColor: "#FFF7E8",
  },

  finalCtaTitle: {
    fontSize: 11,
    color: "#7A1F1F",
    textAlign: "center",
    marginBottom: 5,
  },

  finalCtaText: {
    fontSize: 9,
    color: "#555555",
    textAlign: "center",
    lineHeight: 1.6,
  },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 42,
    right: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#888888",
  },
});

type AstrologyPdfProps = {
  customerName: string;
  reportText: string;
  orderNumber: string;

  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;

  rasi?: string;
  nakshatra?: string;
  lagna?: string;

  question?: string;
};

function Footer({ orderNumber }: { orderNumber: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text>தமிழ் ஜோதிடம் • தனிப்பட்ட அறிக்கை</Text>
      <Text>{orderNumber}</Text>
    </View>
  );
}

function Header({ orderNumber }: { orderNumber: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>தமிழ் ஜோதிடம்</Text>
      <Text style={styles.headerOrder}>{orderNumber}</Text>
    </View>
  );
}

/* ========================================================= */
/* CLEAN AI REPORT */
/* ========================================================= */

function cleanReportText(text: string): string {
  return String(text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ========================================================= */
/* REPORT HEADINGS */
/* ========================================================= */

function isHeading(line: string): boolean {
  const value = line.trim();

  if (!value) return false;

  const headings = [
    "முக்கிய பதில்",
    "முக்கியமான பதில்",
    "உங்கள் கேள்விக்கான பதில்",
    "நேரடி பதில்",
    "ஜாதக காரணங்கள்",
    "ஜோதிட காரணங்கள்",
    "தனிப்பட்ட பகுப்பாய்வு",
    "தனிப்பட்ட ஆய்வு",
    "காலகட்ட வழிகாட்டுதல்",
    "காலகட்டம்",
    "முக்கிய குறிப்புகள்",
    "முக்கிய குறிப்புகள் மற்றும் வழிகாட்டுதல்",
    "இறுதி ஆலோசனை",
    "ஆலோசனை",

    "Main Answer",
    "Direct Answer",
    "Astrology Reasons",
    "Personal Analysis",
    "Timing Guidance",
    "Key Notes",
    "Final Advice",
  ];

  return headings.some((heading) =>
    value.toLowerCase().startsWith(heading.toLowerCase())
  );
}

function getHeadingTitle(line: string): string {
  return line
    .trim()
    .replace(/^[:\-–—]+/, "")
    .replace(/[:\-–—]+$/, "")
    .trim();
}

/* ========================================================= */
/* MAIN ANSWER EXTRACTION */
/* ========================================================= */

function getAnswerPreview(reportText: string): string {
  const cleaned = cleanReportText(reportText);

  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const answerHeadingIndexes = [
    "முக்கிய பதில்",
    "முக்கியமான பதில்",
    "உங்கள் கேள்விக்கான பதில்",
    "நேரடி பதில்",
    "main answer",
    "direct answer",
  ];

  let startIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();

    if (
      answerHeadingIndexes.some((heading) =>
        lower.startsWith(heading.toLowerCase())
      )
    ) {
      startIndex = i + 1;
      break;
    }
  }

  if (startIndex >= 0) {
    const result: string[] = [];

    for (let i = startIndex; i < lines.length; i++) {
      if (isHeading(lines[i])) break;

      result.push(lines[i]);

      if (result.join(" ").length >= 550) break;
    }

    if (result.length > 0) {
      return result.join("\n");
    }
  }

  const meaningful = lines.filter(
    (line) =>
      line.length > 8 &&
      !line.toLowerCase().includes("birth") &&
      !line.toLowerCase().includes("date of birth") &&
      !line.toLowerCase().includes("technical") &&
      !line.toLowerCase().includes("disclaimer")
  );

  return meaningful.slice(0, 4).join("\n");
}

/* ========================================================= */
/* FULL REPORT */
/* ========================================================= */

function ReportContent({ text }: { text: string }) {
  const cleaned = cleanReportText(text);

  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <View>
      {lines.map((line, index) => {
        if (isHeading(line)) {
          return (
            <Text key={`heading-${index}`} style={styles.reportHeading}>
              {getHeadingTitle(line)}
            </Text>
          );
        }

        if (line.startsWith("• ")) {
          return (
            <Text key={`bullet-${index}`} style={styles.bullet}>
              {line}
            </Text>
          );
        }

        return (
          <Text key={`paragraph-${index}`} style={styles.paragraph}>
            {line}
          </Text>
        );
      })}
    </View>
  );
}

/* ========================================================= */
/* PRODUCT CARD */
/* ========================================================= */

function ProductCard({
  name,
  description,
  price,
  premium = false,
}: {
  name: string;
  description: string;
  price: string;
  premium?: boolean;
}) {
  return (
    <View
      style={
        premium ? styles.productCardPremium : styles.productCard
      }
    >
      {premium && (
        <Text style={styles.premiumLabel}>
          ⭐ முழுமையான தேர்வு
        </Text>
      )}

      <View style={styles.productTopRow}>
        <Text style={styles.productName}>{name}</Text>

        <Text style={styles.productPrice}>{price}</Text>
      </View>

      <Text style={styles.productText}>
        {description}
      </Text>

      <Text style={styles.productCta}>
        இந்த அறிக்கையைப் பெறுங்கள் →
      </Text>
    </View>
  );
}

/* ========================================================= */
/* PDF DOCUMENT */
/* ========================================================= */

export function createAstrologyPdfDocument({
  customerName,
  reportText,
  orderNumber,
  birthDate,
  birthTime,
  birthPlace,
  rasi,
  nakshatra,
  lagna,
  question,
}: AstrologyPdfProps) {
  const safeQuestion =
    question?.trim() || "உங்கள் தனிப்பட்ட ஜாதக அறிக்கை";

  const answerPreview = getAnswerPreview(reportText);

  return (
    <Document
      title={`தமிழ் ஜோதிடம் - ${customerName}`}
      author="தமிழ் ஜோதிடம்"
      subject="தனிப்பட்ட ஜாதக அறிக்கை"
    >
      {/* ===================================================== */}
      {/* PAGE 1 — COVER */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverTop}>
          <Text style={styles.coverBrand}>
            தமிழ் ஜோதிடம்
          </Text>

          <Text style={styles.coverTitle}>
            தனிப்பட்ட ஜாதக அறிக்கை
          </Text>

          <Text style={styles.coverSubTitle}>
            உங்கள் கேள்விக்கான தனிப்பட்ட ஜோதிட ஆய்வு
          </Text>
        </View>

        <View style={styles.coverBody}>
          <Text style={styles.coverName}>
            {customerName}
          </Text>

          <View style={styles.coverQuestionBox}>
            <Text style={styles.coverQuestionLabel}>
              உங்கள் கேள்வி
            </Text>

            <Text style={styles.coverQuestion}>
              {safeQuestion}
            </Text>
          </View>
        </View>

        <Text style={styles.coverFooter}>
          அறிக்கை எண்: {orderNumber}
        </Text>
      </Page>

      {/* ===================================================== */}
      {/* PAGE 2 — PROFILE */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionTitle}>
          ஜாதக விவரங்கள்
        </Text>

        <Text style={styles.sectionSubTitle}>
          உங்கள் பிறப்பு தகவல்களின் அடிப்படையிலான தனிப்பட்ட அறிக்கை
        </Text>

        <View style={styles.profileGrid}>
          {birthDate && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                பிறந்த தேதி
              </Text>

              <Text style={styles.profileValue}>
                {birthDate}
              </Text>
            </View>
          )}

          {birthTime && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                பிறந்த நேரம்
              </Text>

              <Text style={styles.profileValue}>
                {birthTime}
              </Text>
            </View>
          )}

          {birthPlace && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                பிறந்த இடம்
              </Text>

              <Text style={styles.profileValue}>
                {birthPlace}
              </Text>
            </View>
          )}

          {rasi && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                ராசி
              </Text>

              <Text style={styles.profileValue}>
                {rasi}
              </Text>
            </View>
          )}

          {nakshatra && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                நட்சத்திரம்
              </Text>

              <Text style={styles.profileValue}>
                {nakshatra}
              </Text>
            </View>
          )}

          {lagna && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>
                லக்னம்
              </Text>

              <Text style={styles.profileValue}>
                {lagna}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            அறிக்கையின் நோக்கம்
          </Text>

          <Text style={styles.noteText}>
            இந்த அறிக்கை உங்கள் பிறப்பு விவரங்கள் மற்றும்
            வழங்கப்பட்ட கேள்வியை அடிப்படையாகக் கொண்டு
            தனிப்பட்ட முறையில் உருவாக்கப்பட்டுள்ளது.
          </Text>
        </View>

        <Footer orderNumber={orderNumber} />
      </Page>

      {/* ===================================================== */}
      {/* PAGE 3 — DIRECT ANSWER */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionTitle}>
          உங்கள் கேள்விக்கான பதில்
        </Text>

        <View style={styles.questionBox}>
          <Text style={styles.questionLabel}>
            கேள்வி
          </Text>

          <Text style={styles.questionText}>
            {safeQuestion}
          </Text>
        </View>

        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>
            முக்கிய பதில்
          </Text>

          <Text style={styles.answerText}>
            {answerPreview ||
              "தனிப்பட்ட பதில் அறிக்கையில் வழங்கப்பட்டுள்ளது."}
          </Text>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            கவனிக்க வேண்டியது
          </Text>

          <Text style={styles.noteText}>
            ஜோதிட விளக்கம் வழிகாட்டுதலுக்காக மட்டுமே.
            முக்கியமான வாழ்க்கை முடிவுகளில் உங்கள் சொந்த
            சூழ்நிலை மற்றும் நடைமுறை தகவல்களையும் கருத்தில்
            கொள்ளுங்கள்.
          </Text>
        </View>

        <Footer orderNumber={orderNumber} />
      </Page>

      {/* ===================================================== */}
      {/* PAGE 4+ — FULL REPORT */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.page} wrap>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionTitle}>
          தனிப்பட்ட ஜாதக பகுப்பாய்வு
        </Text>

        <ReportContent text={reportText} />

        <Footer orderNumber={orderNumber} />
      </Page>

      {/* ===================================================== */}
      {/* PAGE 5 — PROFESSIONAL SALES / UPSELL */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionTitle}>
          மேலும் அறிய விரும்புகிறீர்களா?
        </Text>

        <Text style={styles.sectionSubTitle}>
          உங்கள் வாழ்க்கையின் மற்ற முக்கிய பகுதிகளையும்
          தனிப்பட்ட ஜாதக ஆய்வாக அறிந்துகொள்ளுங்கள்.
        </Text>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            ⭐ உங்களுக்கு தேவையான அறிக்கையை தேர்வு செய்யுங்கள்
          </Text>

          <Text style={styles.noteText}>
            வேலை, திருமணம், வியாபாரம், பணம் அல்லது
            முழுமையான வாழ்க்கை பற்றிய கூடுதல் ஜாதக
            ஆய்வை தனிப்பட்ட முறையில் பெறலாம்.
          </Text>
        </View>

        <ProductCard
          name="வேலை & தொழில் வளர்ச்சி அறிக்கை"
          description="வேலை வாய்ப்பு, வேலை மாற்றம், தொழில் வளர்ச்சி மற்றும் முக்கியமான காலகட்டங்கள் பற்றிய தனிப்பட்ட ஆய்வு."
          price="₹29"
        />

        <ProductCard
          name="திருமண ஜாதக அறிக்கை"
          description="திருமண வாய்ப்பு, திருமண வாழ்க்கை மற்றும் தொடர்புடைய ஜோதிட அம்சங்களுக்கான தனிப்பட்ட ஆய்வு."
          price="₹39"
        />

        <ProductCard
          name="வியாபார ஜாதக அறிக்கை"
          description="வியாபாரம் தொடங்குதல், வளர்ச்சி மற்றும் முக்கியமான வணிக முடிவுகளுக்கான ஜோதிட வழிகாட்டுதல்."
          price="₹49"
        />

        <ProductCard
          name="பணம் & நிதி அறிக்கை"
          description="பணம், சேமிப்பு, நிதி நிலை மற்றும் பொருளாதார முன்னேற்றத்திற்கான தனிப்பட்ட ஆய்வு."
          price="₹29"
        />

        <ProductCard
          name="முழுமையான வாழ்க்கை ஜாதக அறிக்கை"
          description="வாழ்க்கையின் பல முக்கிய பகுதிகளை ஒருங்கிணைத்து வழங்கப்படும் விரிவான தனிப்பட்ட ஜாதக ஆய்வு."
          price="₹399"
          premium
        />

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            உங்கள் ஜாதகத்தை இன்னும் ஆழமாக அறிந்துகொள்ளுங்கள்
          </Text>

          <Text style={styles.noteText}>
            ஒரு குறிப்பிட்ட பகுதியை மட்டும் தேர்வு செய்யலாம்
            அல்லது முழுமையான வாழ்க்கை அறிக்கையை தேர்வு செய்து
            விரிவான ஆய்வைப் பெறலாம்.
          </Text>
        </View>

        <Footer orderNumber={orderNumber} />
      </Page>

      {/* ===================================================== */}
      {/* PAGE 6 — FINAL CTA */}
      {/* ===================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <View style={styles.finalBox}>
          <Text style={styles.finalTitle}>
            நன்றி!
          </Text>

          <Text style={styles.finalText}>
            உங்கள் தனிப்பட்ட ஜாதக அறிக்கையை பயன்படுத்தி
            வாழ்க்கையின் முக்கிய முடிவுகளில் தெளிவான
            வழிகாட்டுதலைப் பெறுங்கள்.
          </Text>
        </View>

        <View style={styles.finalCta}>
          <Text style={styles.finalCtaTitle}>
            அடுத்ததாக என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?
          </Text>

          <Text style={styles.finalCtaText}>
            வேலை • திருமணம் • வியாபாரம் • பணம் •
            முழுமையான வாழ்க்கை
          </Text>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            முக்கிய குறிப்பு
          </Text>

          <Text style={styles.noteText}>
            இந்த அறிக்கை ஜோதிட நம்பிக்கையின் அடிப்படையிலான
            வழிகாட்டுதல் ஆகும். உறுதியான எதிர்கால உத்தரவாதமாக
            இதை கருத வேண்டாம்.
          </Text>
        </View>

        <Footer orderNumber={orderNumber} />
      </Page>
    </Document>
  );
}

/* ========================================================= */
/* DEFAULT COMPONENT */
/* ========================================================= */

export default function AstrologyPdf(
  props: AstrologyPdfProps
) {
  return createAstrologyPdfDocument(props);
}