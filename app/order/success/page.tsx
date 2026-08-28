import Link from "next/link";

export const metadata = {
  title: "ஆர்டர் வெற்றி",
  description: "உங்கள் ஜாதக ஆர்டர் வெற்றிகரமாக பெறப்பட்டது.",
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
    orderNumber?: string;
  }>;
}) {
  const params = await searchParams;

  const orderId = params.orderId || "";
  const orderNumber = params.orderNumber || orderId || "உங்கள் Order ID";

  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-green-200 bg-white p-8 text-center shadow-lg sm:p-12">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">✓</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ஆர்டர் வெற்றிகரமாக பெறப்பட்டது!
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            உங்கள் ஜாதக ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது.
          </p>

          {/* Order Number */}
          <div className="mt-8 rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              உங்கள் Order ID
            </p>

            <p className="mt-2 text-xl font-bold text-gray-900">
              {orderNumber}
            </p>
          </div>

          {/* Status */}
          <div className="mt-6 rounded-2xl bg-yellow-50 p-5">
            <p className="font-semibold text-yellow-800">
              அறிக்கை தயாராகிக் கொண்டிருக்கிறது
            </p>

            <p className="mt-2 text-sm text-yellow-700">
              உங்கள் ஜாதக அறிக்கை தயாரானதும் WhatsApp மூலம்
              அனுப்பப்படும்.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/"
              className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              முகப்புப் பக்கம்
            </Link>

            <Link
              href="/order"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
            >
              மற்றொரு ஜாதகம் ஆர்டர் செய்ய
            </Link>

          </div>

          <p className="mt-8 text-xs text-gray-400">
            Payment status is confirmed by our secure server.
          </p>

        </div>

      </div>
    </main>
  );
}