document.addEventListener("DOMContentLoaded", () => {

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    function show(el) {
        el.classList.remove("hidden");
    }

    function hide(el) {
        el.classList.add("hidden");
    }

    // OPEN LOGIN ONLY FROM BUTTON
    document.getElementById("loginBtn")?.addEventListener("click", () => {
        show(loginModal);
    });

    // GLOBAL CLICK HANDLER
    document.addEventListener("click", (e) => {

        // CLOSE BUTTON
        if (e.target.classList.contains("close-modal")) {
            hide(loginModal);
            hide(signupModal);
        }

        // SWITCH TO SIGNUP
        if (e.target.id === "openSignup") {
            e.preventDefault();
            hide(loginModal);
            show(signupModal);
        }

        // SWITCH TO LOGIN
        if (e.target.id === "openLogin") {
            e.preventDefault();
            hide(signupModal);
            show(loginModal);
        }

        // CLICK OUTSIDE CLOSE
        if (e.target === loginModal) hide(loginModal);
        if (e.target === signupModal) hide(signupModal);
    });
});