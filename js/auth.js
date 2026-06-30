import { supabase } from "./supabase.js";

/* =========================
   SIGN UP
========================= */
export async function signUp(email, password) {

    return await supabase.auth.signUp({
        email,
        password
    });
}

/* =========================
   LOGIN
========================= */
export async function login(email, password) {

    return await supabase.auth.signInWithPassword({
        email,
        password
    });
}

/* =========================
   LOGOUT
========================= */
export async function logout() {

    return await supabase.auth.signOut();
}