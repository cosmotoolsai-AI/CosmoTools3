import { supabase } from "./supabase.js";
import { loadCloudConversations } from "./cloud-chats.js";

window.currentUser = null;

/* =========================
   BOOT APP
========================= */
async function boot() {

    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (user) {
        setUser(user);
    }
}

/* =========================
   AUTH LISTENER
========================= */
supabase.auth.onAuthStateChange((_event, session) => {

    const user = session?.user || null;

    setUser(user);
});

/* =========================
   SET USER
========================= */
function setUser(user) {

    window.currentUser = user;
    window.setCurrentUser?.(user);

    if (user) {
        loadCloudConversations(user.id);
    }
}

boot();