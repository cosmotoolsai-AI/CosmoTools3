const VALID_KEYS = ["cosmo-24", "cosmo-25", "cosmo-26"];

let unlocked = localStorage.getItem("cosmo_unlocked") === "true";

document.addEventListener("DOMContentLoaded", () => {

    const paywall = document.getElementById("paywall");
    const unlockBtn = document.getElementById("unlockBtn");
    const input = document.getElementById("licenseKey");
    const closeBtn = document.getElementById("closePaywall");

    function showPaywall() {
        paywall?.classList.remove("hidden");
    }

    function hidePaywall() {
        paywall?.classList.add("hidden");
    }

    function requireUnlock() {
        if (!unlocked) {
            showPaywall();
            return false;
        }
        return true;
    }

    // SHOW PAYWALL ON FIRST LOAD IF NOT UNLOCKED
    if (!unlocked) {
        setTimeout(showPaywall, 500);
    }

    // UNLOCK BUTTON
    unlockBtn?.addEventListener("click", () => {

        const key = input.value.trim();

        if (VALID_KEYS.includes(key)) {
            unlocked = true;
            localStorage.setItem("cosmo_unlocked", "true");

            hidePaywall();
            alert("Unlocked 🚀 Welcome!");
        } else {
            alert("Invalid key");
        }
    });

    // CLOSE BUTTON (forces locked mode)
    closeBtn?.addEventListener("click", () => {
        showPaywall();
    });

    // EXPOSE GLOBAL CHECK
    window.requireUnlock = requireUnlock;
});