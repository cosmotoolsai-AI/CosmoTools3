/* ==========================================
   UTILITY FUNCTIONS
   (UI HELPERS + CLEANUP)
========================================== */

/* =========================
   AUTO RESIZE TEXTAREA
========================= */
function autoResizeTextarea(textarea) {
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
}

/* =========================
   ATTACH AUTO RESIZE
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const textareas = document.querySelectorAll("textarea");

    textareas.forEach(t => {
        t.addEventListener("input", () => autoResizeTextarea(t));
    });

});

/* =========================
   SIMPLE MARKDOWN-LITE
   (BASIC FORMATTING ONLY)
========================= */
function formatMessage(text) {

    if (!text) return "";

    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")   // bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>")              // italic
        .replace(/`(.*?)`/g, "<code>$1</code>")            // inline code
        .replace(/\n/g, "<br>");                           // line breaks
}

/* =========================
   SMOOTH SCROLL CHAT
========================= */
function scrollToBottom(el) {
    if (!el) return;

    el.scrollTop = el.scrollHeight;
}

/* =========================
   SAFE HTML INSERT
========================= */
function escapeHtml(str) {
    if (!str) return "";

    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================
   GLOBAL HELPERS
========================= */
window.Utils = {
    formatMessage,
    scrollToBottom,
    escapeHtml,
    autoResizeTextarea
};