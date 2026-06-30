export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return res.status(200).json({ 
      reply: "Demo mode: GROQ_API_KEY is not set in Vercel Environment Variables." 
    });
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
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ reply: "Groq Error: " + data.error.message });
    }

    res.status(200).json({ 
      reply: data.choices?.[0]?.message?.content || "I got your message!" 
    });

  } catch (error) {
    res.status(200).json({ 
      reply: "Sorry, I'm having trouble connecting. Please try again." 
    });
  }
}