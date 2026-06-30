import { supabase } from "./supabase.js";
import { loadCloudConversations } from "./cloud-chats.js";

window.currentUser = null;

/* =========================
   SET USER
========================= */
function setUser(user) {

    window.currentUser = user;
    window.setCurrentUser?.(user);

    // close modals when logged in
    if (user) {
        document.getElementById("loginModal")?.classList.add("hidden");
        document.getElementById("signupModal")?.classList.add("hidden");

        loadCloudConversations(user.id);
    }
}

/* =========================
   BOOT SESSION
========================= */
async function boot() {

    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (user) setUser(user);
}

/* =========================
   AUTH LISTENER
========================= */
supabase.auth.onAuthStateChange((_event, session) => {

    const user = session?.user || null;

    setUser(user);
});

boot();