export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;

  // Detailed debug response
  if (!groqKey) {
    return res.status(200).json({ 
      reply: "Demo mode: GROQ_API_KEY environment variable is not set in Vercel." 
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
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ reply: "Groq API Error: " + data.error.message });
    }

    res.status(200).json({ 
      reply: data.choices?.[0]?.message?.content || "I received your message!" 
    });

  } catch (error) {
    res.status(200).json({ 
      reply: "Connection error. Please check your Groq API key in Vercel settings." 
    });
  }
}