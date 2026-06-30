import { supabase } from "./supabase.js";

let messages = [];
let activeChatId = null;
let currentUser = null;

/* =========================
   USER SETTER
========================= */
window.setCurrentUser = (user) => {
    currentUser = user;
};

/* =========================
   SCROLL
========================= */
function scrollToBottom() {
    const box = document.getElementById("chatBox");
    if (!box) return;
    box.scrollTop = box.scrollHeight;
}

/* =========================
   MESSAGE UI
========================= */
function addMessage(role, text) {

    const box = document.getElementById("chatBox");
    if (!box) return null;

    const div = document.createElement("div");
    div.className = role === "user" ? "user-message" : "ai-message";

    div.innerHTML = `
        <div class="avatar">${role === "user" ? "🧑" : "🪐"}</div>
        <div class="message">
            <p>${text}</p>
        </div>
    `;

    box.appendChild(div);
    scrollToBottom();

    return div;
}

/* =========================
   AI CALL
========================= */
async function askAI(text) {

    try {
        const res = await fetch("/api/groq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        return data.reply || "No response";
    } catch (err) {
        console.error(err);
        return "⚠️ AI error";
    }
}

/* =========================
   SEND MESSAGE
========================= */
async function sendMessage(input) {

    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    messages.push({ role: "user", content: text });
    addMessage("user", text);

    const typing = addMessage("ai", "Typing...");

    const reply = await askAI(text);

    if (typing) typing.querySelector("p").innerText = reply;

    messages.push({ role: "assistant", content: reply });

    scrollToBottom();

    /* =========================
       SAVE TO SUPABASE
    ========================= */
    if (currentUser) {

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) return;

        if (!activeChatId && messages.length === 2) {

            const title = text.slice(0, 30);

            const { data } = await supabase
                .from("conversations")
                .insert([{
                    user_id: user.id,
                    title,
                    messages
                }])
                .select();

            if (data?.[0]) activeChatId = data[0].id;
        }

        else if (activeChatId) {

            await supabase
                .from("conversations")
                .update({ messages })
                .eq("id", activeChatId);
        }
    }
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const heroInput = document.getElementById("heroInput");
    const heroBtn = document.getElementById("heroSend");

    const chatInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    function bind(input, button) {
        if (!input || !button) return;

        button.addEventListener("click", () => sendMessage(input));

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(input);
            }
        });
    }

    bind(heroInput, heroBtn);
    bind(chatInput, sendBtn);
});