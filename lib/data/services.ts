import { AstrologyService } from "@/types";

// PHASE 1 NOTE:
// This static array stands in for the `services` database table described in
// the platform spec (Section 9 & 5). In Phase 2 this will be replaced by a
// Supabase/PostgreSQL query, and the Admin > Report Management screen will
// let staff add/edit/deactivate rows here without a code deploy.

export const services: AstrologyService[] = [
  {
    slug: "basic-jathagam",
    nameEn: "Basic Jathagam",
    nameTa: "அடிப்படை ஜாதகம்",
    shortDescriptionTa: "ராசி, நட்சத்திரம், லக்னம் — உங்கள் ஜாதகத்தின் அடிப்படை விவரங்கள்.",
    descriptionTa:
      "பிறந்த தேதி, நேரம், இடம் ஆகியவற்றின் அடிப்படையில் உங்கள் ராசி, நட்சத்திரம், லக்னம் மற்றும் நவகிரக நிலைகளை துல்லியமாக கணக்கிட்டு, எளிய தமிழில் விளக்கும் அறிக்கை.",
    descriptionEn:
      "A foundational horoscope covering your Rasi, Nakshatra, Lagna and planetary positions, explained in clear Tamil.",
    price: 29,
    discountPrice: 19,
    deliveryHours: 1,
    pageCount: "6-8 பக்கங்கள்",
    sections: ["லக்னம்", "ராசி", "நட்சத்திரம்", "நவகிரக நிலைகள்", "பொது குணநலன்"],
    active: true,
  },
  {
    slug: "detailed-jathagam",
    nameEn: "Detailed Jathagam",
    nameTa: "விரிவான ஜாதகம்",
    shortDescriptionTa: "தசா புத்தி உள்ளிட்ட முழுமையான ஜாதக பகுப்பாய்வு.",
    descriptionTa:
      "12 வீடுகள், தசா புத்தி காலங்கள், கிரக பாவங்கள் என அனைத்தையும் உள்ளடக்கிய முழுமையான ஜாதக அறிக்கை. வாழ்க்கையின் முக்கிய திருப்பங்களை புரிந்துகொள்ள உதவும்.",
    descriptionEn:
      "A comprehensive chart reading covering all 12 houses, dasha periods and planetary aspects.",
    price: 99,
    discountPrice: 79,
    deliveryHours: 1,
    pageCount: "18-22 பக்கங்கள்",
    sections: ["12 வீடுகள் பகுப்பாய்வு", "விம்சோத்தரி தசா", "கிரக பாவங்கள்", "நன்மை/தீமை காலங்கள்", "தனிப்பட்ட வழிகாட்டுதல்"],
    popular: true,
    active: true,
  },
  {
    slug: "career-report",
    nameEn: "Career Report",
    nameTa: "தொழில் ஜாதகம்",
    shortDescriptionTa: "உங்கள் தொழில் பாதைக்கு ஏற்ற கிரக அமைப்பு பகுப்பாய்வு.",
    descriptionTa:
      "10-ம் வீடு, சனி, குரு நிலைகளின் அடிப்படையில் உங்களுக்கு பொருந்தும் தொழில் துறைகள், வேலை மாற்றத்திற்கு உகந்த காலம் பற்றிய வழிகாட்டுதல்.",
    descriptionEn:
      "Insights on suitable career paths and favourable timing based on the 10th house and key planetary strengths.",
    price: 59,
    discountPrice: 39,
    deliveryHours: 1,
    pageCount: "10-12 பக்கங்கள்",
    sections: ["10-ம் வீடு பகுப்பாய்வு", "தொழில் பொருத்தம்", "வேலை மாற்ற காலம்", "தசா காலகட்ட வழிகாட்டுதல்"],
    active: true,
  },
  {
    slug: "marriage-report",
    nameEn: "Marriage Report",
    nameTa: "திருமண ஜாதகம்",
    shortDescriptionTa: "திருமண காலம், ஜோடி பொருத்தம் பற்றிய பகுப்பாய்வு.",
    descriptionTa:
      "7-ம் வீடு, சுக்கிரன், செவ்வாய் நிலைகளின் அடிப்படையில் திருமணத்திற்கான உகந்த காலம் மற்றும் இணக்கம் பற்றிய வழிகாட்டுதல்கள்.",
    descriptionEn:
      "Guidance on favourable marriage timing and compatibility factors based on the 7th house and key planets.",
    price: 79,
    discountPrice: 59,
    deliveryHours: 1,
    pageCount: "10-14 பக்கங்கள்",
    sections: ["7-ம் வீடு பகுப்பாய்வு", "கல்யாண காலம்", "தசா பொருத்தம்", "குடும்ப வாழ்க்கை வழிகாட்டுதல்"],
    popular: true,
    active: true,
  },
  {
    slug: "business-report",
    nameEn: "Business Report",
    nameTa: "வணிக ஜாதகம்",
    shortDescriptionTa: "வணிகம் தொடங்க/விரிவாக்க ஏற்ற காலம் குறித்த பகுப்பாய்வு.",
    descriptionTa:
      "வணிக ஸ்தாபனம், பங்குதாரர் உறவுகள், முதலீட்டிற்கு உகந்த காலம் பற்றிய ஜோதிட வழிகாட்டுதல். உத்தரவாதமான லாபம் தொடர்பான கூற்றுகள் இதில் இடம்பெறாது.",
    descriptionEn:
      "Astrological guidance on business timing and partnerships — without guaranteed-outcome claims.",
    price: 89,
    discountPrice: 69,
    deliveryHours: 1,
    pageCount: "10-12 பக்கங்கள்",
    sections: ["வணிக பாவம் பகுப்பாய்வு", "பங்குதாரர் இணக்கம்", "முதலீட்டு காலம்", "எச்சரிக்கை காலங்கள்"],
    active: true,
  },
  {
    slug: "finance-report",
    nameEn: "Finance Report",
    nameTa: "பண ஜாதகம்",
    shortDescriptionTa: "பொருளாதார உறுதிப்பாடு தொடர்பான கிரக பகுப்பாய்வு.",
    descriptionTa:
      "2-ம், 11-ம் வீடுகளின் அடிப்படையில் பண வரவு, சேமிப்பு மற்றும் கடன் தொடர்பான காலங்கள் பற்றிய பொது வழிகாட்டுதல்.",
    descriptionEn:
      "General guidance on financial stability, savings and debt cycles based on the 2nd and 11th houses.",
    price: 59,
    discountPrice: 39,
    deliveryHours: 1,
    pageCount: "8-10 பக்கங்கள்",
    sections: ["2-ம் வீடு பகுப்பாய்வு", "11-ம் வீடு பகுப்பாய்வு", "சேமிப்பு காலம்", "எச்சரிக்கை காலங்கள்"],
    active: true,
  },
  {
    slug: "yearly-prediction",
    nameEn: "Yearly Prediction",
    nameTa: "வருடாந்திர பலன்",
    shortDescriptionTa: "இந்த வருடத்தின் கோச்சார பலன்கள் — மாதம் வாரியாக.",
    descriptionTa:
      "தற்போதைய கிரக கோச்சாரத்தின் அடிப்படையில் இந்த வருடத்தின் மாத வாரியான பொது பலன்கள் மற்றும் முக்கிய காலங்கள்.",
    descriptionEn:
      "Month-by-month transit-based predictions for the current year.",
    price: 129,
    discountPrice: 99,
    deliveryHours: 1,
    pageCount: "8-10 பக்கங்கள்",
    sections: ["மாத வாரியான பலன்", "கோச்சார பாதிப்பு", "சாதக/பாதக காலங்கள்"],
    active: true,
  },
  {
    slug: "compatibility-report",
    nameEn: "Compatibility Report",
    nameTa: "ஜாதக பொருத்தம்",
    shortDescriptionTa: "இரு ஜாதகங்களுக்கு இடையேயான 10-பொருத்தம் பகுப்பாய்வு.",
    descriptionTa:
      "இரு நபர்களின் பிறந்த விவரங்களை ஒப்பிட்டு, பாரம்பரிய 10-பொருத்தம் முறையில் இணக்கத்தன்மையை மதிப்பிடும் அறிக்கை.",
    descriptionEn:
      "Traditional Porutham-style compatibility analysis between two horoscopes.",
    price: 69,
    discountPrice: 49,
    deliveryHours: 1,
    pageCount: "10-12 பக்கங்கள்",
    sections: ["10 பொருத்தம் மதிப்பீடு", "தசா சந்தி பொருத்தம்", "குடும்ப இணக்கம்", "பரிந்துரைகள்"],
    active: true,
  },
  {
    slug: "child-horoscope",
    nameEn: "Child Horoscope",
    nameTa: "குழந்தை ஜாதகம்",
    shortDescriptionTa: "பிறந்த குழந்தையின் ஜாதகம் — கல்வி, ஆரோக்கியம் பற்றிய பொது வழிகாட்டுதல்.",
    descriptionTa:
      "புதிதாக பிறந்த குழந்தையின் ஜாதகக் குறிப்புகளுடன், கல்வி மற்றும் பொது வளர்ச்சி தொடர்பான பொது வழிகாட்டுதல்கள்.",
    descriptionEn:
      "A new-born's chart with general guidance on education and growth themes.",
    price: 59,
    discountPrice: 39,
    deliveryHours: 1,
    pageCount: "8-10 பக்கங்கள்",
    sections: ["ஜாதக குறிப்புகள்", "நட்சத்திரப்படி பெயர் எழுத்து", "கல்வி பொருத்தம்", "பொது ஆரோக்கிய குறிப்புகள்"],
    active: true,
  },
  {
    slug: "complete-life-report",
    nameEn: "Complete Life Report",
    nameTa: "முழு வாழ்க்கை ஜாதகம்",
    shortDescriptionTa: "அனைத்து அம்சங்களையும் உள்ளடக்கிய முழுமையான அறிக்கை.",
    descriptionTa:
      "தொழில், திருமணம், பணம், ஆரோக்கியம், குடும்பம் என வாழ்க்கையின் அனைத்து முக்கிய அம்சங்களையும் உள்ளடக்கிய, எங்கள் மிக விரிவான அறிக்கை.",
    descriptionEn:
      "Our most comprehensive report, covering career, marriage, finance, health and family in one document.",
    price: 499,
    discountPrice: 399,
    deliveryHours: 1.30,
    pageCount: "30+ பக்கங்கள்",
    sections: [
      "முழுமையான 12 வீடு பகுப்பாய்வு",
      "விம்சோத்தரி தசா முழுவதும்",
      "தொழில் & வணிகம்",
      "திருமணம் & குடும்பம்",
      "பணம் & சொத்து",
      "ஆரோக்கியம்",
      "வருடாந்திர பலன் (இந்த வருடம்)",
    ],
    popular: true,
    active: true,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug && s.active);
}

export function getActiveServices() {
  return services.filter((s) => s.active);
}
