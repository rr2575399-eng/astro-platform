export async function generateReport(input: unknown, prompt: string, model = process.env.AI_MODEL || "gpt-4.1-mini") {
  const apiKey = process.env.AI_API_KEY;
  const base = process.env.AI_API_BASE_URL || "https://api.openai.com/v1";
  if (!apiKey) throw new Error("AI_API_KEY is not configured");
  const res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
    method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, temperature: 0.3, messages: [
      { role: "system", content: prompt },
      { role: "user", content: JSON.stringify(input) },
    ] }),
  });
  if (!res.ok) throw new Error(`AI provider failed: ${await res.text()}`);
  const data = await res.json();
  return { model, text: data.choices?.[0]?.message?.content || "" };
}
