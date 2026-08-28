"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }
}
import { getActiveServices, getServiceBySlug } from "@/lib/data/services";
import { BirthDetailsDraft, CustomerDraft, Gender, ReportSlug } from "@/types";
import StepIndicator from "./StepIndicator";

const emptyCustomer: CustomerDraft = {
  fullName: "",
  gender: "",
  mobile: "",
  whatsapp: "",
  sameAsMobile: true,
  email: "",
};

const emptyBirth: BirthDetailsDraft = {
  dob: "",
  birthTime: "",
  timeUnknown: false,
  birthPlace: "",
  birthCountry: "இந்தியா",
  latitude: "",
  longitude: "",
  timeZone: "+05:30",
};

function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[var(--color-night-900)] transition-colors",
    "placeholder:text-[var(--color-night-800)]/35",
    hasError ? "border-[var(--color-kumkum-600)]" : "border-night-900/15 focus:border-[var(--color-kumkum-600)]",
  ].join(" ");
}

function labelClass() {
  return "block text-sm font-semibold text-[var(--color-night-900)]";
}

export default function OrderForm({ preselectedService }: { preselectedService?: ReportSlug }) {
  const router = useRouter ( );
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerDraft>(emptyCustomer);
  const [birth, setBirth] = useState<BirthDetailsDraft>(emptyBirth);
  const [serviceSlug, setServiceSlug] = useState<ReportSlug | "">(preselectedService ?? "");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const services = getActiveServices();
  const selectedService = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  function validateStep(n: number): boolean {
    const e: Record<string, string> = {};
    if (n === 1) {
      if (!customer.fullName.trim()) e.fullName = "பெயரை உள்ளிடவும்";
      if (!customer.gender) e.gender = "பாலினத்தை தேர்வு செய்யவும்";
      if (!/^\d{10}$/.test(customer.mobile.trim())) e.mobile = "சரியான 10 இலக்க எண்ணை உள்ளிடவும்";
      if (!customer.sameAsMobile && !/^\d{10}$/.test(customer.whatsapp.trim()))
        e.whatsapp = "சரியான 10 இலக்க WhatsApp எண்ணை உள்ளிடவும்";
    }
    if (n === 2) {
      if (!birth.dob) e.dob = "பிறந்த தேதியை உள்ளிடவும்";
      if (!birth.timeUnknown && !birth.birthTime) e.birthTime = "பிறந்த நேரத்தை உள்ளிடவும் (அல்லது 'தெரியவில்லை' தேர்வு செய்யவும்)";
      if (!birth.birthPlace.trim()) e.birthPlace = "பிறந்த ஊரை உள்ளிடவும்";
    }
    if (n === 3) {
      if (!serviceSlug) e.service = "ஒரு சேவையை தேர்வு செய்யவும்";
    }
    if (n === 5) {
      if (!consent) e.consent = "தொடர உங்கள் ஒப்புதல் தேவை";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(5, s + 1));
  }
  function back() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    if (!validateStep(5) || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const draft = {
        customer: { ...customer, whatsapp: customer.sameAsMobile ? customer.mobile : customer.whatsapp },
        birthDetails: birth,
        serviceSlug,
        questions,
        consentGiven: consent,
      };
      const orderRes = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "ஆர்டர் உருவாக்க முடியவில்லை");
      setOrderNumber(orderData.orderNumber);
const paymentRes = await fetch("/api/payments/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ orderId: orderData.orderId }),
});

const paymentText = await paymentRes.text();

let paymentData: any;

try {
  paymentData = JSON.parse(paymentText);
} catch {
  console.error("Payment API returned:", paymentText);
  throw new Error(
    "Payment API error. VS Code Terminal-ல் வரும் error-ஐ பார்க்கவும்."
  );
}

if (!paymentRes.ok) {
  throw new Error(paymentData.error || "கட்டண இணைப்பை உருவாக்க முடியவில்லை");
}
            if (!window.Razorpay) throw new Error("Payment checkout இன்னும் load ஆகவில்லை. மீண்டும் முயற்சிக்கவும்.");

      const Razorpay = window.Razorpay;
    const checkout = new Razorpay({
  key: paymentData.keyId,
  amount: paymentData.amount,
  currency: paymentData.currency,
  name: "ஜாதகம் AI",
  description: selectedService?.nameEn || "Astrology Report",
  order_id: paymentData.gatewayOrderId,

  prefill: {
    name: customer.fullName,
    contact: customer.mobile,
    email: customer.email || undefined,
  },

  notes: {
    order_number: orderData.orderNumber,
  },

  theme: {
    color: "#9c2b45",
  },

  handler: async function (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) {
    try {
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderData.orderId,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(
          verifyData.error || "Payment verification failed"
        );
      }

      // Payment successful
      window.location.href =
        `/order/success?order=${encodeURIComponent(
          verifyData.orderNumber || orderData.orderNumber
        )}`;

    } catch (error) {
      console.error("Payment verification error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Payment verification failed"
      );
    }
  },

  modal: {
    ondismiss: function () {
      setSubmitting(false);
      setSubmitError("Payment cancelled. நீங்கள் மீண்டும் முயற்சி செய்யலாம்.");
    },
  },
});

checkout.open();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "ஏதோ தவறு ஏற்பட்டது");
    } finally {
      setSubmitting(false);
    }
  }

  const price = selectedService
    ? selectedService.discountPrice ?? selectedService.price
    : 0;

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-night-900/8 bg-white p-8 text-center shadow-sm">
        <span
          className="mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl"
          style={{ background: "var(--color-paper-dim)" }}
        >
          🛠️
        </span>
        <h2 className="font-display mt-4 text-2xl text-[var(--color-night-900)]">
          ஆர்டர் உருவாக்கப்பட்டது — கட்டண சாளரம் திறக்கப்பட்டது
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-night-800)]/75">
          உங்கள் ஆர்டர் பாதுகாப்பாக உருவாக்கப்பட்டுள்ளது. கட்டணம் வெற்றியாக உறுதிப்படுத்தப்பட்டதும்
          server webhook மூலம் report pipeline தொடங்கும். உங்கள் Order ID:
        </p>

        <p className="mt-4 text-lg font-bold text-[var(--color-kumkum-600)]">{orderNumber}</p>
        <dl className="mt-6 space-y-2 rounded-xl bg-[var(--color-paper-dim)] p-4 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-[var(--color-night-800)]/60">பெயர்</dt>
            <dd className="font-semibold">{customer.fullName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--color-night-800)]/60">சேவை</dt>
            <dd className="font-semibold">{selectedService?.nameTa}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--color-night-800)]/60">தொகை</dt>
            <dd className="font-semibold">₹{price}</dd>
          </div>
        </dl>

        <p className="mt-6 text-xs text-[var(--color-night-800)]/55">Payment status is confirmed only by the server-side payment webhook.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator current={step} />

      <div className="mt-8 rounded-2xl border border-night-900/8 bg-white p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl text-[var(--color-night-900)]">வாடிக்கையாளர் விவரம்</h2>

            <div>
              <label className={labelClass()} htmlFor="fullName">முழுப் பெயர்</label>
              <input
                id="fullName"
                className={inputClass(!!errors.fullName)}
                value={customer.fullName}
                onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
                placeholder="எ.கா. ராமன் குமார்"
              />
              {errors.fullName && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.fullName}</p>}
            </div>

            <div>
              <span className={labelClass()}>பாலினம்</span>
              <div className="mt-2 flex gap-3">
                {(["male", "female", "other"] as Gender[]).map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setCustomer((c) => ({ ...c, gender: g }))}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      borderColor: customer.gender === g ? "var(--color-kumkum-600)" : "rgba(20,17,58,0.15)",
                      background: customer.gender === g ? "rgba(156,43,69,0.08)" : "white",
                      color: customer.gender === g ? "var(--color-kumkum-600)" : "var(--color-night-900)",
                    }}
                  >
                    {g === "male" ? "ஆண்" : g === "female" ? "பெண்" : "மற்றவை"}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.gender}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass()} htmlFor="mobile">மொபைல் எண்</label>
                <input
                  id="mobile"
                  inputMode="numeric"
                  className={inputClass(!!errors.mobile)}
                  value={customer.mobile}
                  onChange={(e) => setCustomer((c) => ({ ...c, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                  placeholder="98765 43210"
                />
                {errors.mobile && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.mobile}</p>}
              </div>
              <div>
                <label className={labelClass()} htmlFor="email">மின்னஞ்சல் (விருப்பம்)</label>
                <input
                  id="email"
                  type="email"
                  className={inputClass()}
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-[var(--color-night-800)]/85">
                <input
                  type="checkbox"
                  checked={customer.sameAsMobile}
                  onChange={(e) => setCustomer((c) => ({ ...c, sameAsMobile: e.target.checked }))}
                  className="h-4 w-4 accent-[var(--color-kumkum-600)]"
                />
                WhatsApp எண் மொபைல் எண் போலவே இருக்கும்
              </label>
              {!customer.sameAsMobile && (
                <div className="mt-3">
                  <label className={labelClass()} htmlFor="whatsapp">WhatsApp எண்</label>
                  <input
                    id="whatsapp"
                    inputMode="numeric"
                    className={inputClass(!!errors.whatsapp)}
                    value={customer.whatsapp}
                    onChange={(e) => setCustomer((c) => ({ ...c, whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                    placeholder="98765 43210"
                  />
                  {errors.whatsapp && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.whatsapp}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl text-[var(--color-night-900)]">பிறந்த விவரம்</h2>
            <p className="text-sm text-[var(--color-night-800)]/70">
              துல்லியமான கணிப்புக்கு பிறந்த நேரம் மற்றும் இடம் மிக முக்கியம்.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass()} htmlFor="dob">பிறந்த தேதி</label>
                <input
                  id="dob"
                  type="date"
                  className={inputClass(!!errors.dob)}
                  value={birth.dob}
                  onChange={(e) => setBirth((b) => ({ ...b, dob: e.target.value }))}
                />
                {errors.dob && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.dob}</p>}
              </div>
              <div>
                <label className={labelClass()} htmlFor="birthTime">பிறந்த நேரம்</label>
                <div className="flex gap-2">
  <select
    id="birthHour"
    disabled={birth.timeUnknown}
    value={(() => {
      if (!birth.birthTime) return "12";
      const hour = Number(birth.birthTime.split(":")[0]);
      return String(hour % 12 || 12);
    })()}
    onChange={(e) => {
      const [, minute = "00"] = birth.birthTime.split(":");
      const selectedHour = Number(e.target.value);
      const oldHour = Number(birth.birthTime.split(":")[0]);

      const isPM = oldHour >= 12;

      let hour24 =
        isPM
          ? selectedHour === 12 ? 12 : selectedHour + 12
          : selectedHour === 12 ? 0 : selectedHour;

      setBirth((b) => ({
        ...b,
        birthTime: `${String(hour24).padStart(2, "0")}:${minute}`,
      }));
    }}
    className={inputClass(!!errors.birthTime)}
  >
    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
      <option key={hour} value={hour}>
        {String(hour).padStart(2, "0")}
      </option>
    ))}
  </select>

  <input
    type="number"
    min="0"
    max="59"
    disabled={birth.timeUnknown}
    value={birth.birthTime ? birth.birthTime.split(":")[1] || "00" : "00"}
    onChange={(e) => {
      const hour = birth.birthTime
        ? birth.birthTime.split(":")[0]
        : "00";

      const minute = Math.min(
        59,
        Math.max(0, Number(e.target.value))
      );

      setBirth((b) => ({
        ...b,
        birthTime: `${hour}:${String(minute).padStart(2, "0")}`,
      }));
    }}
    className={inputClass(!!errors.birthTime)}
  />

  <select
    disabled={birth.timeUnknown}
    value={
      Number(birth.birthTime?.split(":")[0] || 0) >= 12
        ? "PM"
        : "AM"
    }
    onChange={(e) => {
      const [currentHour = "00", minute = "00"] =
        birth.birthTime.split(":");

      let hour = Number(currentHour) % 12;

      if (e.target.value === "PM") {
        hour += 12;
      }

      setBirth((b) => ({
        ...b,
        birthTime: `${String(hour).padStart(2, "0")}:${minute}`,
      }));
    }}
    className={inputClass(!!errors.birthTime)}
  >
    <option value="AM">AM</option>
    <option value="PM">PM</option>
  </select>
</div>
                {errors.birthTime && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.birthTime}</p>}
                <label className="mt-2 flex items-center gap-2 text-xs text-[var(--color-night-800)]/70">
                  <input
                    type="checkbox"
                    checked={birth.timeUnknown}
                    onChange={(e) => setBirth((b) => ({ ...b, timeUnknown: e.target.checked, birthTime: "" }))}
                    className="h-3.5 w-3.5 accent-[var(--color-kumkum-600)]"
                  />
                  பிறந்த நேரம் எனக்கு தெரியவில்லை
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass()} htmlFor="birthPlace">பிறந்த ஊர்</label>
              <input
                id="birthPlace"
                className={inputClass(!!errors.birthPlace)}
                value={birth.birthPlace}
                onChange={(e) => setBirth((b) => ({ ...b, birthPlace: e.target.value }))}
                placeholder="எ.கா. மதுரை, தமிழ்நாடு"
              />
              {errors.birthPlace && <p className="mt-1 text-xs text-[var(--color-kumkum-600)]">{errors.birthPlace}</p>}
              <p className="mt-1 text-xs text-[var(--color-night-800)]/50">
                துல்லியமான அட்சரேகை/தீர்க்கரேகை பின்னணியில் தானாக கண்டறியப்படும் (Phase 5-ல் இணைக்கப்படும்).
              </p>
            </div>

            <div>
              <label className={labelClass()} htmlFor="birthCountry">நாடு</label>
              <input
                id="birthCountry"
                className={inputClass()}
                value={birth.birthCountry}
                onChange={(e) => setBirth((b) => ({ ...b, birthCountry: e.target.value }))}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl text-[var(--color-night-900)]">சேவை தேர்வு</h2>
            {errors.service && <p className="text-xs text-[var(--color-kumkum-600)]">{errors.service}</p>}
            <div className="grid gap-3">
              {services.map((s) => (
                <button
                  type="button"
                  key={s.slug}
                  onClick={() => setServiceSlug(s.slug)}
                  className="flex items-center justify-between rounded-xl border p-4 text-left transition-colors"
                  style={{
                    borderColor: serviceSlug === s.slug ? "var(--color-kumkum-600)" : "rgba(20,17,58,0.12)",
                    background: serviceSlug === s.slug ? "rgba(156,43,69,0.06)" : "white",
                  }}
                >
                  <div>
                    <p className="font-semibold text-[var(--color-night-900)]">{s.nameTa}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-night-800)]/60">
                      {s.deliveryHours} மணி நேரம் • {s.pageCount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg" style={{ color: "var(--color-kumkum-600)" }}>
                      ₹{s.discountPrice ?? s.price}
                    </p>
                    {s.discountPrice && (
                      <p className="text-xs text-[var(--color-night-800)]/40 line-through">₹{s.price}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-[var(--color-night-900)]">கேள்விகள் (விருப்பம்)</h2>
            <label className={labelClass()} htmlFor="questions">
              உங்களுக்கு தெரிந்து கொள்ள விரும்பும் முக்கியமான விஷயம் என்ன?
            </label>
            <textarea
              id="questions"
              rows={5}
              className={inputClass()}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="எ.கா. எனது தொழில் மாற்றத்திற்கு உகந்த காலம் எப்போது?"
            />
            <p className="text-xs text-[var(--color-night-800)]/50">
              இந்த கேள்விகள் உங்கள் அறிக்கையின் "வழிகாட்டுதல்" பகுதியில் கருத்தில் கொள்ளப்படும்.
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[var(--color-night-900)]">பரிசீலனை</h2>

            <dl className="divide-y divide-night-900/8 rounded-xl border border-night-900/10">
              {[
                ["பெயர்", customer.fullName],
                ["மொபைல்", customer.mobile],
                ["பிறந்த தேதி", birth.dob],
                ["பிறந்த நேரம்", birth.timeUnknown ? "தெரியவில்லை" : birth.birthTime],
                ["பிறந்த ஊர்", birth.birthPlace],
                ["சேவை", selectedService ? `${selectedService.nameTa} (${selectedService.nameEn})` : "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                  <dt className="text-[var(--color-night-800)]/60">{k}</dt>
                  <dd className="font-semibold text-[var(--color-night-900)]">{v || "—"}</dd>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 text-[15px]">
                <dt className="font-semibold">மொத்த தொகை</dt>
                <dd className="font-display text-xl" style={{ color: "var(--color-kumkum-600)" }}>
                  ₹{price}
                </dd>
              </div>
            </dl>

            <label className="flex items-start gap-2.5 text-sm text-[var(--color-night-800)]/85">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--color-kumkum-600)]"
              />
              <span>
                எனது பிறந்த விவரங்கள் ஜாதக அறிக்கை தயாரிக்க பயன்படுத்தப்படும் என்பதை நான்
                ஒப்புக்கொள்கிறேன். மேலும் விவரங்களுக்கு{" "}
                <a href="/privacy-policy" className="underline" style={{ color: "var(--color-kumkum-600)" }}>
                  தனியுரிமைக் கொள்கையை
                </a>{" "}
                படிக்கவும்.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-[var(--color-kumkum-600)]">{errors.consent}</p>}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-night-900/8 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-night-800)] disabled:opacity-0"
          >
            ← பின்
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full px-7 py-3 text-sm font-semibold text-[var(--color-paper)] shadow-sm transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-kumkum-600)" }}
            >
              அடுத்து →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full px-7 py-3 text-sm font-semibold text-[var(--color-night-950)] shadow-sm transition-transform hover:scale-[1.02]"
              style={{ background: "var(--color-gold-500)" }}
            >
              பணம் செலுத்தத் தொடரவும் →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
