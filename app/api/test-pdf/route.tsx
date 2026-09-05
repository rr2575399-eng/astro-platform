import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import AstrologyPdf from "@/lib/pdf/astrology-pdf";

export const runtime = "nodejs";

export async function GET() {
  try {
    const pdfBuffer = await renderToBuffer(
      <AstrologyPdf
        customerName="ராஜசேகர்"
        orderNumber="TEST-001"
        reportText={`உங்கள் ஜாதகத்தின் பொதுவான விளக்கம்

இன்று உங்கள் முயற்சிகளில் முன்னேற்றம் கிடைக்கக்கூடிய நாள்.

வேலை:
புதிய வாய்ப்புகளை கவனமாக பரிசீலிக்கவும்.

பணம்:
தேவையற்ற செலவுகளை தவிர்த்து திட்டமிட்டு செயல்படவும்.

குடும்பம்:
குடும்பத்தினருடன் நல்ல புரிதல் ஏற்படும்.

இது ஒரு மாதிரி AI ஜாதக அறிக்கை.`}
      />
    );

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="test-tamil.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        error: "PDF generation failed",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}