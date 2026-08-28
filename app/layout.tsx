import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// NOTE: fonts are loaded via <link> in <head> below rather than next/font.
// next/font/google fetches from fonts.googleapis.com at BUILD time, which
// fails in network-restricted build environments (CI runners behind a
// firewall, offline Docker builds, etc). A <link> tag fetches at request
// time in the browser instead, so the build never depends on that network
// access. If your deploy target does have build-time internet access and
// you'd prefer self-hosted/optimized fonts, swap this for next/font/google
// (Catamaran + Tiro_Tamil, both used below) or next/font/local.

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jathagam-ai.example"),
  title: {
    default: "தமிழ் ஜோதிடம் — AI உதவியுடன் தமிழ் ஜாதக அறிக்கை | Jathagam AI",
    template: "%s | ஜாதகம் AI",
  },
  description:
    "உங்கள் பிறந்த விவரங்களின் அடிப்படையில் துல்லியமான ஜோதிட கணிப்புகளுடன் தனிப்பயன் தமிழ் ஜாதக அறிக்கையை பெறுங்கள். WhatsApp வழியாக PDF வடிவில் நேரடியாக உங்களுக்கு அனுப்பப்படும்.",
  keywords: [
    "ஜாதகம்",
    "ஜோதிடம்",
    "jathagam online",
    "tamil astrology report",
    "AI jathagam",
    "birth chart tamil",
    "horoscope reading tamil",
  ],
  openGraph: {
    title: "ஜாதகம் AI — AI உதவியுடன் தமிழ் ஜாதக அறிக்கை",
    description:
      "உங்கள் ஜாதகத்தை புரிந்து கொள்ளுங்கள். AI உதவியுடன் தனிப்பட்ட ஜாதக அறிக்கையைப் பெறுங்கள்.",
    locale: "ta_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;600;700;800&family=Tiro+Tamil&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
