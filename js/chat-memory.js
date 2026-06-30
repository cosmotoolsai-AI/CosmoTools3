import { supabase } from "./supabase.js";

/* =========================
   SAVE CLOUD CHAT
========================= */
export async function saveCloudConversation(userId, title, messages) {

    return await supabase
        .from("conversations")
        .insert([{
            user_id: userId,
            title,
            messages
        }]);
}

/* =========================
   UPDATE CLOUD CHAT
========================= */
export async function updateCloudConversation(id, messages) {

    return await supabase
        .from("conversations")
        .update({ messages })
        .eq("id", id);
}

/* =========================
   LOAD USER CHATS
========================= */
export async function loadCloudConversations(userId) {

    const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    const list = document.querySelector(".recent-list");
    if (!list) return;

    list.innerHTML = "";

    data.forEach(conv => {

        const div = document.createElement("div");
        div.className = "recent-card";

        div.innerHTML = `
            <h3>${conv.title}</h3>
            <p>${conv.messages.length} messages</p>
        `;

        div.onclick = () => {
            window.loadConversationIntoChat(conv.id);
        };

        list.appendChild(div);
    });
}

/* =========================
   LOAD CHAT INTO UI
========================= */
export function loadConversationIntoChat(conv) {

    const box = document.getElementById("chatBox");
    if (!box) return;

    box.innerHTML = "";

    conv.messages.forEach(m => {

        const div = document.createElement("div");
        div.className = m.role === "user" ? "user-message" : "ai-message";

        div.innerHTML = `
            <div class="avatar">${m.role === "user" ? "🧑" : "🪐"}</div>
            <div class="message">
                <h4>${m.role === "user" ? "You" : "CosmoAI"}</h4>
                <p>${m.content}</p>
            </div>
        `;

        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}