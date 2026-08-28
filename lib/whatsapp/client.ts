export async function sendWhatsAppDocument(to: string, documentUrl: string, caption: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) throw new Error("WhatsApp credentials are not configured");
  const res = await fetch(`https://graph.facebook.com/v23.0/${phoneId}/messages`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "document", document: { link: documentUrl, caption } }),
  });
  if (!res.ok) throw new Error(`WhatsApp API failed: ${await res.text()}`);
  return await res.json();
}
