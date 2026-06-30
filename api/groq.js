// For Vercel / Netlify Functions (or local proxy)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    // Replace with your real Groq key in production (use env vars)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(200).json({ reply: "Got it! (Demo mode - connect your Groq key for real responses)" });
  }
}