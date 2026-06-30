import { supabase } from "./supabase.js";

/* =========================
   SIGN UP
========================= */
export async function signUp(email, password) {

    const res = await supabase.auth.signUp({
        email,
        password
    });

    // close UI immediately
    document.getElementById("signupModal")?.classList.add("hidden");

    return res;
}

/* =========================
   LOGIN
========================= */
export async function login(email, password) {

    const res = await supabase.auth.signInWithPassword({
        email,
        password
    });

    // close UI immediately
    document.getElementById("loginModal")?.classList.add("hidden");

    return res;
}

/* =========================
   LOGOUT
========================= */
export async function logout() {

    return await supabase.auth.signOut();
}