const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are a helpful assistant for KAFA (Kooperativ Asirans Fanmi Ayisyen), a cooperative insurance organization that protects Haitian families against funeral expenses.

Key facts about KAFA:
- KAFA guarantees 100% payment of funeral expenses for members
- Plans are affordable and designed for all Haitian families
- Members can apply online at kafayiti.com using the membership form
- KAFA covers funeral costs so families do not face financial hardship during difficult times
- Contact: kontak@kafayiti.com
- The membership application requires a first name, last name, and phone number at minimum
- Members receive a unique KAFA member number upon registration
- Plans vary in coverage amount — visit the Plans page for details

Answer questions clearly and helpfully in whatever language the user writes in (Haitian Creole, French, English, Spanish, or Portuguese). Keep responses concise and friendly. If you don't know something specific about KAFA, say so and suggest contacting kontak@kafayiti.com.`;

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

    const { messages } = JSON.parse(event.body ?? "{}");
    if (!messages?.length) throw new Error("No messages provided");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text ?? "";

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
