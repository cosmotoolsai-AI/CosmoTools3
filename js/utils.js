function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}