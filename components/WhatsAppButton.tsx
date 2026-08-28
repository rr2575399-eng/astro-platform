// PHASE 1 NOTE: links to wa.me with a pre-filled message. Real WhatsApp
// Business Cloud API delivery (for report PDFs) is wired in Phase 8 —
// see WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID in .env.example.
const WHATSAPP_NUMBER = "910000000000"; // TODO: replace with real business number
const MESSAGE = encodeURIComponent("வணக்கம், எனக்கு ஜாதகம் பற்றி தெரிந்து கொள்ள வேண்டும்.");

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp வழியாக தொடர்பு கொள்ள"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ background: "#25D366" }}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-white"
      >
        <path d="M16.02 3C9.4 3 4 8.36 4 15c0 2.4.66 4.65 1.84 6.62L4 29l7.6-1.94A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.64 28 15S22.64 3 16.02 3zm0 21.7c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.5 1.15 1.2-4.38-.25-.4A9.63 9.63 0 0 1 5.3 15c0-5.9 4.8-10.7 10.72-10.7S26.74 9.1 26.74 15 22 24.7 16.02 24.7zm5.9-8.02c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.38.24-.7.08-.32-.16-1.34-.5-2.56-1.6-.94-.85-1.58-1.9-1.76-2.22-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.76-.99-2.4-.26-.63-.53-.55-.72-.56h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.5 5.48 4.9.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z" />
      </svg>
    </a>
  );
}
