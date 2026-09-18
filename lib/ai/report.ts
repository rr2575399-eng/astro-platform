// lib/ai/report.ts

export async function generateReport(
  input: unknown,
  prompt: string,
  model = process.env.AI_MODEL || "gemini-3.5-flash-lite"
) {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured");
  }

  // --------------------------------------------------------
  // GEMINI API URL
  // --------------------------------------------------------

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/` +
    `${model}:generateContent?key=${apiKey}`;

  // --------------------------------------------------------
  // INPUT PREPARE
  // --------------------------------------------------------

  const inputText =
    typeof input === "string"
      ? input
      : JSON.stringify(input, null, 2);

  // --------------------------------------------------------
  // RETRY LOGIC — 3 attempts
  // --------------------------------------------------------

  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // System instruction — prompt
          system_instruction: {
            parts: [
              {
                text: prompt,
              },
            ],
          },

          // Customer data — user message
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: inputText,
                },
              ],
            },
          ],

          // Generation config
          generationConfig: {
            // 0.5 — creative ஆனால் controlled
            temperature: 0.5,

            // Report cut ஆகாமல் இருக்க
            maxOutputTokens: 8192,

            // Focused output
            topP: 0.95,
            topK: 40,
          },

          // Safety settings — astrology content block ஆகாமல்
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE",
            },
          ],
        }),
      });

      // --------------------------------------------------------
      // ERROR HANDLING
      // --------------------------------------------------------

      if (!res.ok) {
        const errorBody = await res.text();

        // Rate limit — wait and retry
        if (
          res.status === 429 &&
          attempt < MAX_ATTEMPTS
        ) {
          const waitMs = attempt * 3000;
          console.warn(
            `Gemini rate limited. Attempt ${attempt}.` +
            ` Waiting ${waitMs}ms...`
          );
          await new Promise((r) =>
            setTimeout(r, waitMs)
          );
          continue;
        }

        throw new Error(
          `Gemini API failed [${res.status}]: ${errorBody}`
        );
      }

      // --------------------------------------------------------
      // PARSE RESPONSE
      // --------------------------------------------------------

      const data = await res.json();

      // Gemini response structure:
      // data.candidates[0].content.parts[0].text

      const text: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "";

      // Empty response — retry
      if (!text.trim() && attempt < MAX_ATTEMPTS) {
        console.warn(
          `Empty Gemini response. Attempt ${attempt}.` +
          ` Retrying...`
        );
        await new Promise((r) =>
          setTimeout(r, 1500)
        );
        continue;
      }

      // --------------------------------------------------------
      // FINISH REASON CHECK
      // --------------------------------------------------------

      const finishReason =
        data?.candidates?.[0]?.finishReason;

      if (finishReason === "MAX_TOKENS") {
        console.warn(
          "Gemini report cut due to MAX_TOKENS. " +
          "Consider increasing maxOutputTokens."
        );
      }

      if (finishReason === "SAFETY") {
        console.warn(
          "Gemini blocked due to SAFETY filter. " +
          "Check safetySettings."
        );

        if (attempt < MAX_ATTEMPTS) {
          await new Promise((r) =>
            setTimeout(r, 1000)
          );
          continue;
        }
      }

      // --------------------------------------------------------
      // TOKEN USAGE LOG
      // --------------------------------------------------------

      const usage = data?.usageMetadata;

      if (usage) {
        console.log(
          `Gemini tokens — ` +
          `prompt: ${usage.promptTokenCount}, ` +
          `output: ${usage.candidatesTokenCount}, ` +
          `total: ${usage.totalTokenCount}`
        );
      }

      return { model, text };

    } catch (error) {
      // Last attempt — throw
      if (attempt === MAX_ATTEMPTS) {
        throw error;
      }

      console.warn(
        `Gemini attempt ${attempt} failed. Retrying...`,
        error
      );

      await new Promise((r) =>
        setTimeout(r, attempt * 2000)
      );
    }
  }

  throw new Error(
    "Gemini report generation failed after retries"
  );
}
