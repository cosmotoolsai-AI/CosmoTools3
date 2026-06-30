/* ==========================================
   SIDEBAR NAVIGATION SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navButtons = document.querySelectorAll(".nav-btn");
    const chatSection = document.getElementById("chatSection");
    const workspace = document.querySelector(".workspace");
    const recent = document.querySelector(".recent");
    const hero = document.querySelector(".hero-search");

    // =========================
    // RESET VIEW
    // =========================
    function hideAll() {
        if (chatSection) chatSection.style.display = "none";
        if (workspace) workspace.style.display = "none";
        if (recent) recent.style.display = "none";
        if (hero) hero.style.display = "none";
    }

    function showAll() {
        if (chatSection) chatSection.style.display = "flex";
        if (workspace) workspace.style.display = "block";
        if (recent) recent.style.display = "block";
        if (hero) hero.style.display = "block";
    }

    // =========================
    // NAV HANDLING
    // =========================

    navButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            // active state
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const text = btn.innerText.toLowerCase();

            // reset first
            showAll();

            // SIMPLE ROUTING LOGIC
            if (text.includes("chat")) {
                showAll();
            }

            else if (text.includes("documents")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("coding")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("business")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("marketing")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("research")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("automation")) {
                hideAll();
                if (chatSection) chatSection.style.display = "flex";
            }

            else if (text.includes("favorites")) {
                hideAll();
                if (recent) recent.style.display = "block";
            }

            else if (text.includes("settings")) {
                hideAll();
                if (recent) recent.style.display = "block";
            }

        });

    });

});