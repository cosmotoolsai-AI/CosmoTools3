export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return res.status(200).json({ reply: "Groq API key is not configured in Vercel Environment Variables." });
  }

  try {
    const { message } = req.body;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }],
        temperature: 0.85,
        max_tokens: 1000
      })
    });

    const data = await groqResponse.json();

    const reply = data.choices && data.choices[0] && data.choices[0].message 
      ? data.choices[0].message.content 
      : "I received your request. Let me think of a good response...";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(200).json({ reply: "Sorry, I'm having trouble connecting to the AI. Please try again in a moment." });
  }
}