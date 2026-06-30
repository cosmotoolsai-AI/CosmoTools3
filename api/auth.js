// api/auth.js - Supabase or your auth backend later
export default function handler(req, res) {
  res.status(200).json({ 
    message: "Authentication coming in Phase 2",
    status: "planned" 
  });
}