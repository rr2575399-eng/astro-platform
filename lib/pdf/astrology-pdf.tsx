import path from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const tamilFontPath = path.join(
  process.cwd(),
  "public",
  "fonts",
  "NotoSansTamil-Regular.ttf"
);

Font.register({
  family: "NotoTamil",
  src: tamilFontPath,
});

const COLORS = {
  maroon: "#5B1E2D",
  maroonLight: "#7A3445",
  gold: "#B88A3B",
  goldLight: "#F3E7CA",
  cream: "#FBF7EF",
  white: "#FFFFFF",
  dark: "#292020",
  muted: "#756B68",
  border: "#E2D6C8",
  soft: "#F6EFE5",
};

const styles = StyleSheet.create({
  page: {
    size: "A4",
    paddingTop: 38,
    paddingBottom: 52,
    paddingHorizontal: 40,
    backgroundColor: COLORS.cream,
    fontFamily: "NotoTamil",
    color: COLORS.dark,
    fontSize: 10.5,
    lineHeight: 1.55,
  },

  // ---------------- COVER ----------------

  coverPage: {
    paddingHorizontal: 42,
    paddingVertical: 42,
    backgroundColor: COLORS.cream,
    fontFamily: "NotoTamil",
    color: COLORS.dark,
  },

  coverTopLine: {
    width: 70,
    height: 4,
    backgroundColor: COLORS.gold,
    marginBottom: 18,
  },

  brand: {
    fontSize: 15,
    color: COLORS.maroon,
    marginBottom: 8,
  },

  brandSmall: {
    fontSize: 8.5,
    color: COLORS.gold,
    letterSpacing: 1,
  },

  coverTitle: {
    fontSize: 25,
    color: COLORS.maroon,
    marginTop: 20,
    marginBottom: 9,
  },

  coverSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 1.7,
    marginBottom: 25,
  },

  coverQuestionCard: {
    backgroundColor: COLORS.maroon,
    padding: 20,
    borderRadius: 8,
    marginBottom: 22,
  },

  coverQuestionLabel: {
    fontSize: 8.5,
    color: "#EEDDBD",
    marginBottom: 7,
  },

  coverQuestion: {
    fontSize: 17,
    color: COLORS.white,
    lineHeight: 1.5,
  },

  customerCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 17,
    borderRadius: 7,
    marginBottom: 20,
  },

  customerName: {
    fontSize: 17,
    color: COLORS.maroon,
    marginBottom: 12,
  },

  coverInfoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },

  coverInfoLabel: {
    width: 90,
    fontSize: 9,
    color: COLORS.muted,
  },

  coverInfoValue: {
    flex: 1,
    fontSize: 9.5,
    color: COLORS.dark,
  },

  coverBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.goldLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 22,
  },

  coverBadgeText: {
    fontSize: 8.5,
    color: COLORS.maroon,
  },

  coverBottom: {
    marginTop: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  coverBottomText: {
    fontSize: 8,
    color: COLORS.muted,
    lineHeight: 1.5,
  },

  // ---------------- COMMON ----------------

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerBrand: {
    fontSize: 9,
    color: COLORS.maroon,
  },

  headerReport: {
    fontSize: 7.5,
    color: COLORS.muted,
  },

  sectionNumber: {
    fontSize: 8,
    color: COLORS.gold,
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 18,
    color: COLORS.maroon,
    marginBottom: 15,
  },

  subTitle: {
    fontSize: 12.5,
    color: COLORS.maroon,
    marginTop: 10,
    marginBottom: 7,
  },

  paragraph: {
    fontSize: 10.3,
    lineHeight: 1.65,
    marginBottom: 8,
  },

  // ---------------- PROFILE ----------------

  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 17,
  },

  profileCard: {
    width: "31.8%",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
  },

  profileLabel: {
    fontSize: 7.5,
    color: COLORS.muted,
    marginBottom: 5,
  },

  profileValue: {
    fontSize: 10.5,
    color: COLORS.maroon,
  },

  detailsBox: {
    backgroundColor: COLORS.soft,
    borderRadius: 7,
    padding: 13,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
  },

  label: {
    width: 105,
    fontSize: 9,
    color: COLORS.muted,
  },

  value: {
    flex: 1,
    fontSize: 9.5,
    color: COLORS.dark,
  },

  // ---------------- QUESTION / ANSWER ----------------

  questionBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
    padding: 14,
    borderRadius: 6,
    marginBottom: 14,
  },

  questionLabel: {
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 5,
  },

  questionText: {
    fontSize: 13,
    color: COLORS.maroon,
    lineHeight: 1.6,
  },

  answerBox: {
    backgroundColor: COLORS.goldLight,
    borderRadius: 7,
    padding: 16,
    marginBottom: 17,
  },

  answerLabel: {
    fontSize: 8.5,
    color: COLORS.maroon,
    marginBottom: 7,
  },

  answerText: {
    fontSize: 12,
    color: COLORS.dark,
    lineHeight: 1.75,
  },

  // ---------------- CONTENT ----------------

  contentBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 7,
    padding: 14,
    marginBottom: 12,
  },

  contentHeading: {
    fontSize: 12,
    color: COLORS.maroon,
    marginBottom: 7,
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  bulletMark: {
    width: 14,
    fontSize: 10,
    color: COLORS.gold,
  },

  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.55,
  },

  // ---------------- PLANETS ----------------

  planetBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 7,
    padding: 12,
    marginBottom: 12,
  },

  planetRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE5DA",
    paddingVertical: 6,
  },

  planetName: {
    width: 85,
    fontSize: 9.5,
    color: COLORS.maroon,
  },

  planetMeaning: {
    flex: 1,
    fontSize: 9.2,
    color: COLORS.dark,
  },

  // ---------------- PRODUCT ----------------

  productIntro: {
    fontSize: 10.5,
    lineHeight: 1.65,
    marginBottom: 14,
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 7,
    padding: 12,
    marginBottom: 8,
  },

  productName: {
    fontSize: 11,
    color: COLORS.maroon,
    marginBottom: 3,
  },

  productDescription: {
    fontSize: 8.8,
    color: COLORS.muted,
    lineHeight: 1.5,
  },

  ctaBox: {
    backgroundColor: COLORS.maroon,
    borderRadius: 8,
    padding: 17,
    marginTop: 8,
  },

  ctaTitle: {
    fontSize: 13,
    color: COLORS.white,
    marginBottom: 7,
  },

  ctaText: {
    fontSize: 9.2,
    color: "#F4EBDD",
    lineHeight: 1.6,
  },

  // ---------------- FOOTER ----------------

  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    fontSize: 7,
    color: COLORS.muted,
    textAlign: "center",
  },

  pageNumber: {
    position: "absolute",
    bottom: 10,
    right: 40,
    fontSize: 7,
    color: COLORS.muted,
  },
});

export type AstrologyPdfProps = {
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

function Footer() {
  return (
    <>
      <Text style={styles.footer}>
        ஜோதிடம் பாரம்பரிய விளக்க முறையாகும். இது அறிவியல் உறுதி
        அல்லது மருத்துவ, சட்ட, நிதி உத்தரவாதம் அல்ல.
      </Text>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `பக்கம் ${pageNumber} / ${totalPages}`
        }
      />
    </>
  );
}

function Header({ orderNumber }: { orderNumber: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerBrand}>தமிழ் ஜோதிடம்</Text>

      <Text style={styles.headerReport}>
        தனிப்பட்ட ஜாதக அறிக்கை · {orderNumber}
      </Text>
    </View>
  );
}

/**
 * AI report-ல் PDF-க்கு தேவையில்லாத duplicate title / technical heading-களை
 * remove செய்கிறது.
 */
function cleanReportText(text: string) {
  return text
    .replace(/^#.*$/gm, "")
    .replace(/Basic Jathagam/gi, "")
    .replace(/Jathagam AI/gi, "")
    .replace(/ஜாதகம் AI/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitReport(text: string) {
  const cleaned = cleanReportText(text);

  return cleaned
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function ReportContent({ text }: { text: string }) {
  const lines = splitReport(text);

  return (
    <>
      {lines.map((line, index) => {
        const isHeading =
          line.startsWith("##") ||
          line.endsWith(":") ||
          line.endsWith("：");

        const isBullet =
          line.startsWith("-") ||
          line.startsWith("•") ||
          line.startsWith("*");

        if (isHeading) {
          return (
            <Text key={index} style={styles.contentHeading}>
              {line.replace(/^#+\s*/, "").replace(/:$/, "")}
            </Text>
          );
        }

        if (isBullet) {
          return (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bulletMark}>•</Text>

              <Text style={styles.bulletText}>
                {line.replace(/^[-•*]\s*/, "")}
              </Text>
            </View>
          );
        }

        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      })}
    </>
  );
}

/**
 * Report text-ல் இருந்து முதல் meaningful பகுதியை
 * "முக்கிய பதில்" card-ல் காட்டுகிறது.
 *
 * AI prompt structured output கொடுத்தால் இன்னும் நல்ல result வரும்.
 */
function getAnswerPreview(text: string) {
  const lines = splitReport(text);

  const meaningful = lines.filter(
    (line) =>
      !line.startsWith("#") &&
      !line.includes("பிறந்த தேதி") &&
      !line.includes("பிறந்த நேரம்") &&
      !line.includes("பிறந்த இடம்") &&
      !line.includes("ராசி") &&
      !line.includes("நட்சத்திரம்") &&
      !line.includes("லக்னம்")
  );

  return (
    meaningful.slice(0, 3).join(" ") ||
    "உங்கள் கேள்விக்கு ஜாதக அடிப்படையில் தனிப்பட்ட விளக்கம் இந்த அறிக்கையில் வழங்கப்பட்டுள்ளது."
  );
}

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
  const answerPreview = getAnswerPreview(reportText);

  return (
    <Document
      title="தமிழ் ஜோதிடம் - தனிப்பட்ட ஜாதக அறிக்கை"
      author="தமிழ் ஜோதிடம்"
      subject="தனிப்பட்ட ஜாதக அறிக்கை"
    >
      {/* ======================================================
          PAGE 1 — PREMIUM COVER
      ====================================================== */}

      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverTopLine} />

        <Text style={styles.brand}>தமிழ் ஜோதிடம்</Text>

        <Text style={styles.brandSmall}>
          தனிப்பட்ட ஜாதக வழிகாட்டுதல்
        </Text>

        <Text style={styles.coverTitle}>
          தனிப்பட்ட ஜாதக அறிக்கை
        </Text>

        <Text style={styles.coverSubtitle}>
          உங்கள் பிறந்த விவரங்கள் மற்றும் நீங்கள் கேட்டுள்ள
          கேள்வியை அடிப்படையாகக் கொண்ட தனிப்பட்ட ஜோதிட விளக்கம்.
        </Text>

        <View style={styles.coverQuestionCard}>
          <Text style={styles.coverQuestionLabel}>
            உங்கள் முக்கிய கேள்வி
          </Text>

          <Text style={styles.coverQuestion}>
            {question || "தனிப்பட்ட ஜாதக பகுப்பாய்வு"}
          </Text>
        </View>

        <View style={styles.customerCard}>
          <Text style={styles.customerName}>
            {customerName}
          </Text>

          {birthDate && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>
                பிறந்த தேதி
              </Text>

              <Text style={styles.coverInfoValue}>
                {birthDate}
              </Text>
            </View>
          )}

          {birthTime && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>
                பிறந்த நேரம்
              </Text>

              <Text style={styles.coverInfoValue}>
                {birthTime}
              </Text>
            </View>
          )}

          {birthPlace && (
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>
                பிறந்த இடம்
              </Text>

              <Text style={styles.coverInfoValue}>
                {birthPlace}
              </Text>
            </View>
          )}

          <View style={styles.coverInfoRow}>
            <Text style={styles.coverInfoLabel}>
              அறிக்கை எண்
            </Text>

            <Text style={styles.coverInfoValue}>
              {orderNumber}
            </Text>
          </View>
        </View>

        <View style={styles.coverBadge}>
          <Text style={styles.coverBadgeText}>
            தனிப்பட்ட அறிக்கை
          </Text>
        </View>

        <View style={styles.coverBottom}>
          <Text style={styles.coverBottomText}>
            இந்த அறிக்கை பாரம்பரிய ஜோதிட விளக்க முறையை அடிப்படையாகக்
            கொண்டது. முக்கியமான வாழ்க்கை முடிவுகளில் உங்கள் சொந்த
            முடிவும் நடைமுறை சூழ்நிலைகளும் கருத்தில் கொள்ளப்பட வேண்டும்.
          </Text>
        </View>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 2 — JATHAGA PROFILE
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>01</Text>

        <Text style={styles.sectionTitle}>
          உங்கள் ஜாதக அடையாளம்
        </Text>

        <View style={styles.profileGrid}>
          {rasi && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>ராசி</Text>
              <Text style={styles.profileValue}>{rasi}</Text>
            </View>
          )}

          {nakshatra && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>நட்சத்திரம்</Text>
              <Text style={styles.profileValue}>
                {nakshatra}
              </Text>
            </View>
          )}

          {lagna && (
            <View style={styles.profileCard}>
              <Text style={styles.profileLabel}>லக்னம்</Text>
              <Text style={styles.profileValue}>{lagna}</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsBox}>
          {birthDate && (
            <View style={styles.row}>
              <Text style={styles.label}>பிறந்த தேதி</Text>
              <Text style={styles.value}>{birthDate}</Text>
            </View>
          )}

          {birthTime && (
            <View style={styles.row}>
              <Text style={styles.label}>பிறந்த நேரம்</Text>
              <Text style={styles.value}>{birthTime}</Text>
            </View>
          )}

          {birthPlace && (
            <View style={styles.row}>
              <Text style={styles.label}>பிறந்த இடம்</Text>
              <Text style={styles.value}>{birthPlace}</Text>
            </View>
          )}
        </View>

        <Text style={styles.subTitle}>
          இந்த அறிக்கை எப்படி அமைக்கப்பட்டுள்ளது?
        </Text>

        <Text style={styles.paragraph}>
          முதலில் உங்கள் கேள்விக்கான முக்கிய விளக்கம் வழங்கப்படுகிறது.
          அதன் பின்னர் ஜாதகத்தின் முக்கிய அம்சங்கள், தனிப்பட்ட
          குணநலன்கள் மற்றும் வாழ்க்கையின் தொடர்புடைய பகுதிகள்
          எளிய தமிழில் விளக்கப்படுகின்றன.
        </Text>

        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>
            உங்கள் அறிக்கையின் முக்கிய நோக்கம்
          </Text>

          <Text style={styles.answerText}>
            {question ||
              "உங்கள் பிறந்த விவரங்களை அடிப்படையாகக் கொண்ட தனிப்பட்ட ஜாதக விளக்கம்"}
          </Text>
        </View>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 3 — MAIN ANSWER
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>02</Text>

        <Text style={styles.sectionTitle}>
          உங்கள் கேள்விக்கான முக்கிய பதில்
        </Text>

        <View style={styles.questionBox}>
          <Text style={styles.questionLabel}>
            நீங்கள் கேட்டது
          </Text>

          <Text style={styles.questionText}>
            {question || "தனிப்பட்ட ஜாதக பகுப்பாய்வு"}
          </Text>
        </View>

        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>
            முக்கிய பதில்
          </Text>

          <Text style={styles.answerText}>
            {answerPreview}
          </Text>
        </View>

        <Text style={styles.subTitle}>
          ஜாதக அடிப்படையிலான விளக்கம்
        </Text>

        <View style={styles.contentBox}>
          <ReportContent text={reportText} />
        </View>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 4 — PERSONAL ANALYSIS
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>03</Text>

        <Text style={styles.sectionTitle}>
          தனிப்பட்ட ஜாதக விளக்கம்
        </Text>

        <View style={styles.contentBox}>
          <ReportContent text={reportText} />
        </View>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 5 — PLANETS
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>04</Text>

        <Text style={styles.sectionTitle}>
          நவகிரகங்களின் முக்கிய அம்சங்கள்
        </Text>

        <View style={styles.planetBox}>
          <View style={styles.planetRow}>
            <Text style={styles.planetName}>சூரியன்</Text>
            <Text style={styles.planetMeaning}>
              தன்னம்பிக்கை, தலைமை, அதிகாரம்
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>சந்திரன்</Text>
            <Text style={styles.planetMeaning}>
              மனநிலை, உணர்வுகள், சிந்தனை
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>செவ்வாய்</Text>
            <Text style={styles.planetMeaning}>
              முயற்சி, ஆற்றல், செயல்பாடு
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>புதன்</Text>
            <Text style={styles.planetMeaning}>
              அறிவு, தொடர்பு, சிந்தனை
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>குரு</Text>
            <Text style={styles.planetMeaning}>
              வளர்ச்சி, அறிவு, வழிகாட்டுதல்
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>சுக்கிரன்</Text>
            <Text style={styles.planetMeaning}>
              உறவு, வசதி, கலை
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>சனி</Text>
            <Text style={styles.planetMeaning}>
              பொறுப்பு, பொறுமை, தாமதம்
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>ராகு</Text>
            <Text style={styles.planetMeaning}>
              ஆசை, மாற்றம், புதிய அனுபவங்கள்
            </Text>
          </View>

          <View style={styles.planetRow}>
            <Text style={styles.planetName}>கேது</Text>
            <Text style={styles.planetMeaning}>
              உள்ளுணர்வு, ஆன்மிகம், விடுபாடு
            </Text>
          </View>
        </View>

        <Text style={styles.subTitle}>
          உங்கள் அறிக்கையில் கவனிக்க வேண்டியது
        </Text>

        <Text style={styles.paragraph}>
          மேலே உள்ளவை நவகிரகங்களின் பொதுவான பாரம்பரிய
          விளக்கங்கள். தனிப்பட்ட பலனை புரிந்துகொள்ள கிரக நிலைகள்,
          பாவங்கள் மற்றும் பிற ஜாதக அம்சங்கள் ஒன்றாக பார்க்கப்பட வேண்டும்.
        </Text>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 6 — REPORT SUMMARY + PRODUCTS
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>05</Text>

        <Text style={styles.sectionTitle}>
          மேலும் தெரிந்து கொள்ள வேண்டியவை
        </Text>

        <Text style={styles.productIntro}>
          இந்த அறிக்கை உங்கள் முக்கிய கேள்வியை மையமாகக் கொண்டது.
          வாழ்க்கையின் மற்ற முக்கிய பகுதிகளுக்கும் தனிப்பட்ட
          விளக்கத்தை பெற கீழ்கண்ட அறிக்கைகளை தேர்வு செய்யலாம்.
        </Text>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            விரிவான ஜாதக அறிக்கை
          </Text>

          <Text style={styles.productDescription}>
            உங்கள் ஜாதகத்தின் முக்கிய அம்சங்களை மேலும் விரிவாக
            புரிந்துகொள்ள உதவும் முழுமையான விளக்கம்.
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            திருமண அறிக்கை
          </Text>

          <Text style={styles.productDescription}>
            திருமண வாழ்க்கை, துணைவர் தொடர்பான அம்சங்கள் மற்றும்
            உறவுகள் குறித்து தனிப்பட்ட பார்வை.
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            தொழில் அறிக்கை
          </Text>

          <Text style={styles.productDescription}>
            வேலை, தொழில், திறமை மற்றும் தொழில் முன்னேற்றம்
            தொடர்பான ஜோதிட விளக்கம்.
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            பணம் மற்றும் நிதி அறிக்கை
          </Text>

          <Text style={styles.productDescription}>
            வருமானம், சேமிப்பு மற்றும் பொருளாதார முன்னேற்றம்
            தொடர்பான தனிப்பட்ட பார்வை.
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            ஆண்டு பலன்
          </Text>

          <Text style={styles.productDescription}>
            தேர்ந்தெடுக்கப்பட்ட ஆண்டிற்கான முக்கிய வாழ்க்கை
            மாற்றங்கள் மற்றும் வாய்ப்புகள்.
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productName}>
            முழுமையான வாழ்க்கை அறிக்கை
          </Text>

          <Text style={styles.productDescription}>
            வாழ்க்கையின் பல முக்கிய பகுதிகளை ஒருங்கிணைத்து
            பார்க்கும் விரிவான அறிக்கை.
          </Text>
        </View>

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>
            உங்கள் அடுத்த கேள்விக்கும் தனிப்பட்ட பதிலை பெறுங்கள்
          </Text>

          <Text style={styles.ctaText}>
            உங்கள் வாழ்க்கையில் உங்களுக்கு முக்கியமான கேள்வியை
            தேர்வு செய்து அதற்கான தனிப்பட்ட ஜாதக அறிக்கையைப் பெறலாம்.
          </Text>
        </View>

        <Footer />
      </Page>

      {/* ======================================================
          PAGE 7 — FINAL CTA
      ====================================================== */}

      <Page size="A4" style={styles.page}>
        <Header orderNumber={orderNumber} />

        <Text style={styles.sectionNumber}>06</Text>

        <Text style={styles.sectionTitle}>
          இறுதி வழிகாட்டுதல்
        </Text>

        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>
            நினைவில் கொள்ள வேண்டியது
          </Text>

          <Text style={styles.answerText}>
            ஜோதிட விளக்கத்தை ஒரு வழிகாட்டுதலாக பயன்படுத்துங்கள்.
            உங்கள் வாழ்க்கை முடிவுகளில் உங்கள் அனுபவம், சூழ்நிலை,
            முயற்சி மற்றும் நடைமுறை தகவல்களையும் கருத்தில் கொள்ளுங்கள்.
          </Text>
        </View>

        <Text style={styles.subTitle}>
          உங்கள் அறிக்கையை சேமித்து வைத்துக்கொள்ளுங்கள்
        </Text>

        <Text style={styles.paragraph}>
          இந்த அறிக்கை உங்கள் பிறந்த விவரங்கள் மற்றும் நீங்கள்
          கேட்ட கேள்வியை அடிப்படையாகக் கொண்டது. எதிர்காலத்தில்
          தேவையான போது இதை மீண்டும் பார்க்கலாம்.
        </Text>

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>
            தமிழ் ஜோதிடம்
          </Text>

          <Text style={styles.ctaText}>
            உங்கள் அடுத்த கேள்விக்கான தனிப்பட்ட ஜாதக அறிக்கையை
            தேர்வு செய்யுங்கள்.
          </Text>

          <Text style={styles.ctaText}>
            திருமணம் · தொழில் · பணம் · ஆண்டு பலன் · முழுமையான வாழ்க்கை
          </Text>
        </View>

        <Text style={styles.subTitle}>
          நன்றி
        </Text>

        <Text style={styles.paragraph}>
          உங்கள் தனிப்பட்ட ஜாதக அறிக்கையை தேர்வு செய்ததற்கு நன்றி.
        </Text>

        <Footer />
      </Page>
    </Document>
  );
}

export default function AstrologyPdf(props: AstrologyPdfProps) {
  return createAstrologyPdfDocument(props);
}