function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

    // LOGIN BUTTON
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        openModal("loginModal");
    });

    // SWITCH TO SIGNUP
    document.getElementById("openSignup")?.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal("loginModal");
        openModal("signupModal");
    });

    // SWITCH TO LOGIN
    document.getElementById("openLogin")?.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal("signupModal");
        openModal("loginModal");
    });

    // CLOSE BUTTONS (THIS FIXES YOUR MAIN ISSUE)
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", () => {
            closeModal("loginModal");
            closeModal("signupModal");
        });
    });

    // CLICK OUTSIDE MODAL CLOSE
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.add("hidden");
            }
        });
    });
});