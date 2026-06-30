import { supabase } from "./supabase.js";

window.activeChatId = null;

/* =========================
   LOAD SIDEBAR CHATS
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

        const item = document.createElement("div");
        item.className = "recent-card";

        item.innerHTML = `
            <h3>${conv.title}</h3>
            <p>${conv.messages?.length || 0} messages</p>
        `;

        item.onclick = () => {

            window.activeChatId = conv.id;

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
        };

        list.appendChild(item);
    });
}