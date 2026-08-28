import type { Metadata } from "next";
import { getActiveServices } from "@/lib/data/services";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "ஜாதக அறிக்கை சேவைகள்",
  description:
    "அடிப்படை ஜாதகம் முதல் முழு வாழ்க்கை அறிக்கை வரை — உங்களுக்கு ஏற்ற தமிழ் ஜாதக அறிக்கையை தேர்வு செய்யுங்கள்.",
};

export default function ServicesPage() {
  const services = getActiveServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-kumkum-600)" }}>
          அனைத்து சேவைகளும்
        </span>
        <h1 className="font-display mt-2 text-4xl text-[var(--color-night-900)]">
          உங்களுக்கு ஏற்ற ஜாதக அறிக்கையை தேர்வு செய்யுங்கள்
        </h1>
        <p className="mt-4 text-[var(--color-night-800)]/75">
          அனைத்து அறிக்கைகளும் நம்பகமான ஜோதிட கணக்கீட்டு பொறி மூலம் கணக்கிடப்பட்டு,
          எளிய தமிழில் AI உதவியுடன் தயாரிக்கப்படுகின்றன.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
