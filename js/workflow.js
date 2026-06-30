let workflowsData = [];

/* =========================
   LOAD WORKFLOWS
========================= */
async function loadWorkflows() {
    try {
        const res = await fetch("/data/workflows.json");
        workflowsData = await res.json();

        renderWorkflows(workflowsData);

    } catch (err) {
        console.error("Failed to load workflows:", err);
    }
}

/* =========================
   RENDER WORKFLOWS GRID
========================= */
function renderWorkflows(data) {

    const grid = document.getElementById("workflowGrid");
    if (!grid) return;

    grid.innerHTML = "";

    data.forEach(workflow => {

        const card = document.createElement("div");
        card.className = "card workflow-card";

        card.innerHTML = `
            <div style="font-size:26px">${workflow.icon}</div>
            <h3>${workflow.title}</h3>
            <p>${workflow.description}</p>
            <button class="run-btn">Run →</button>
        `;

        /* =========================
           CLICK → FILL PROMPT
        ========================= */
        card.addEventListener("click", (e) => {

            // prevent double trigger when clicking button
            if (e.target.classList.contains("run-btn")) return;

            const input = document.getElementById("heroInput");
            if (!input) return;

            input.value = workflow.prompt + " ";
            input.focus();
        });

        /* =========================
           RUN DIRECTLY → AI CHAT
        ========================= */
        card.querySelector(".run-btn").addEventListener("click", (e) => {
            e.stopPropagation();

            const input = document.getElementById("heroInput");
            if (!input) return;

            input.value = workflow.prompt + " ";
            input.focus();

            // auto-send if chat system exists
            if (typeof handleMessage === "function") {
                handleMessage(input);
            }
        });

        grid.appendChild(card);
    });
}

/* =========================
   OPTIONAL: SEARCH WORKFLOWS
========================= */
function searchWorkflows(query) {

    if (!query) {
        renderWorkflows(workflowsData);
        return;
    }

    const filtered = workflowsData.filter(w =>
        w.title.toLowerCase().includes(query.toLowerCase()) ||
        w.description.toLowerCase().includes(query.toLowerCase())
    );

    renderWorkflows(filtered);
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {

    loadWorkflows();

    // optional search hook (if you add input later)
    const searchInput = document.getElementById("workflowSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchWorkflows(e.target.value);
        });
    }
});