document.addEventListener("DOMContentLoaded", () => {

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    const loginBtn = document.getElementById("loginBtn");
    const openSignup = document.getElementById("openSignup");
    const openLogin = document.getElementById("openLogin");

    const closeButtons = document.querySelectorAll(".close-modal");

    function open(modal) {
        modal?.classList.remove("hidden");
    }

    function close(modal) {
        modal?.classList.add("hidden");
    }

    // OPEN LOGIN
    loginBtn?.addEventListener("click", () => {
        open(loginModal);
    });

    // SWITCH TO SIGNUP
    openSignup?.addEventListener("click", (e) => {
        e.preventDefault();
        close(loginModal);
        open(signupModal);
    });

    // SWITCH TO LOGIN
    openLogin?.addEventListener("click", (e) => {
        e.preventDefault();
        close(signupModal);
        open(loginModal);
    });

    // CLOSE X BUTTON (THIS WAS BROKEN BEFORE)
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            close(loginModal);
            close(signupModal);
        });
    });

    // CLICK OUTSIDE MODAL CLOSE
    [loginModal, signupModal].forEach(modal => {
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) {
                close(modal);
            }
        });
    });

});