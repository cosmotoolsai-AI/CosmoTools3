export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are CosmoAI, a helpful, fast, modern AI assistant inside a productivity app."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        const reply =
            data?.choices?.[0]?.message?.content ||
            "No response from AI.";

        res.status(200).json({ reply });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}