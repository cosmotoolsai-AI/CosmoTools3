document.addEventListener("DOMContentLoaded", () => {

    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    if (!chatBox || !userInput || !sendBtn) {
        console.error("Chat elements missing in HTML");
        return;
    }

    function addMessage(role, text) {

        const wrapper = document.createElement("div");
        wrapper.className = role === "user" ? "user-message" : "ai-message";

        wrapper.innerHTML = `
            <div class="avatar">${role === "user" ? "🧑" : "🪐"}</div>
            <div class="message"><p>${text}</p></div>
        `;

        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;

        return wrapper;
    }

    async function getAIResponse(message) {

        try {
            const res = await fetch("/api/groq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) {
                return "AI server error (check /api/groq)";
            }

            const data = await res.json();
            return data.reply || "No response from AI";

        } catch (err) {
            console.error(err);
            return "Failed to connect to AI backend";
        }
    }

    async function handleSend() {

        if (window.requireUnlock && !window.requireUnlock()) return;

        const text = userInput.value.trim();
        if (!text) return;

        userInput.value = "";

        // show user message
        addMessage("user", text);

        // show loading AI message
        const loadingMsg = addMessage("ai", "Thinking...");

        const reply = await getAIResponse(text);

        loadingMsg.querySelector("p").innerText = reply;
    }

    sendBtn.addEventListener("click", handleSend);

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    });

});