// Shared types for the AI Astrology platform.
// These mirror the future PostgreSQL schema (see /lib/database in later phases)
// so that Phase 1 UI components already speak the same shape the backend will use.

export type ReportSlug =
  | "basic-jathagam"
  | "detailed-jathagam"
  | "career-report"
  | "marriage-report"
  | "business-report"
  | "finance-report"
  | "yearly-prediction"
  | "compatibility-report"
  | "child-horoscope"
  | "complete-life-report";

export interface AstrologyService {
  slug: ReportSlug;
  nameEn: string;
  nameTa: string;
  shortDescriptionTa: string;
  descriptionTa: string;
  descriptionEn: string;
  price: number; // INR, in rupees
  discountPrice: number | null;
  deliveryHours: number;
  pageCount: string; // e.g. "12-15 pages"
  sections: string[]; // report sections included, Tamil
  popular?: boolean;
  active: boolean;
}

export type Gender = "male" | "female" | "other";

export interface CustomerDraft {
  fullName: string;
  gender: Gender | "";
  mobile: string;
  whatsapp: string;
  sameAsMobile: boolean;
  email: string;
}

export interface BirthDetailsDraft {
  dob: string; // yyyy-mm-dd
  birthTime: string; // HH:mm
  timeUnknown: boolean;
  birthPlace: string;
  birthCountry: string;
  latitude: string;
  longitude: string;
  timeZone: string;
}

export interface OrderDraft {
  customer: CustomerDraft;
  birthDetails: BirthDetailsDraft;
  serviceSlug: ReportSlug | "";
  questions: string;
  consentGiven: boolean;
}

// Order lifecycle — matches the pipeline in the master spec (Phase 4+)
export type OrderStatus =
  | "ORDER_CREATED"
  | "PAYMENT_PENDING"
  | "PAYMENT_SUCCESS"
  | "CALCULATION_PENDING"
  | "CALCULATION_COMPLETED"
  | "AI_REPORT_PENDING"
  | "AI_REPORT_COMPLETED"
  | "PDF_PENDING"
  | "PDF_COMPLETED"
  | "WHATSAPP_PENDING"
  | "WHATSAPP_SENT"
  | "COMPLETED"
  | "FAILED"
  | "REFUND_REQUESTED"
  | "REFUNDED";

export type PaymentStatus =
  | "CREATED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";
