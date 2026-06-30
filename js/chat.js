import { supabase } from "./supabase.js";
import { renderMarkdown } from "./markdown.js";

let messages = [];
let activeChatId = null;
let currentUser = null;

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
   MESSAGE UI (MARKDOWN ENABLED)
========================= */
function addMessage(role, text) {

    const box = document.getElementById("chatBox");
    if (!box) return null;

    const div = document.createElement("div");
    div.className = role === "user" ? "user-message" : "ai-message";

    const content = role === "ai"
        ? renderMarkdown(text)
        : escapeHtml(text);

    div.innerHTML = `
        <div class="avatar">${role === "user" ? "🧑" : "🪐"}</div>
        <div class="message">
            <div class="text">${content}</div>
        </div>
    `;

    box.appendChild(div);
    scrollToBottom();

    return div;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/* =========================
   AI CALL
========================= */
async function askAI(text) {

    const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    return data.reply || "No response";
}

/* =========================
   SEND MESSAGE (STREAM FEEL)
========================= */
async function sendMessage(inputEl) {

    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = "";

    messages.push({ role: "user", content: text });
    addMessage("user", text);

    // typing bubble
    const typing = addMessage("ai", "Thinking...");

    const reply = await askAI(text);

// clear typing text
if (typing) {
    const el = typing.querySelector(".text");
    el.innerHTML = "";

    let i = 0;
    const speed = 12; // lower = faster

    function stream() {
        if (i < reply.length) {
            el.innerHTML += reply[i];
            i++;
            setTimeout(stream, speed);
        }
    }

    stream();
}

    // STREAM EFFECT (fake typing)
    if (typing) {

        let i = 0;
        typing.querySelector(".text").innerHTML = "";

        function type() {
            if (i < reply.length) {
                typing.querySelector(".text").innerHTML += reply[i];
                i++;
                setTimeout(type, 8);
            }
        }

        type();
    }

    messages.push({ role: "assistant", content: reply });

    scrollToBottom();

    /* =========================
       SUPABASE SAVE
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

            if (data?.[0]) {
                activeChatId = data[0].id;
            }
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
    const heroSend = document.getElementById("heroSend");

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

    bind(heroInput, heroSend);
    bind(chatInput, sendBtn);
});