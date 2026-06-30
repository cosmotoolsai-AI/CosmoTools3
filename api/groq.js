export default async function handler(req, res) {
  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return res.status(200).json({ reply: "Error: Groq API key is not set in Vercel." });
  }

  try {
    const { message } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await response.json();

    res.status(200).json({ 
      reply: data.choices?.[0]?.message?.content || "I received your message. How else can I help?" 
    });

  } catch (error) {
    res.status(200).json({ reply: "Sorry, I'm having trouble connecting to the AI right now. Please try again." });
  }
}