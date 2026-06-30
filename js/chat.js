let messages = [];

window.sendMessage = async function() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage('user', text);
  input.value = '';

  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chat-window').classList.remove('hidden');

  const typingId = addTyping();

  try {
    const res = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    removeTyping(typingId);
    addMessage('ai', data.reply);
  } catch (e) {
    removeTyping(typingId);
    addMessage('ai', "Sorry, I'm having trouble right now.");
  }
};

function addMessage(role, content) {
  const chatWindow = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
  div.innerHTML = `
    <div class="message ${role === 'user' ? 'user-message' : 'ai-message'}">
      ${content}
    </div>
  `;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addTyping() {
  const id = 'typing-' + Date.now();
  const chatWindow = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.id = id;
  div.innerHTML = `<div class="ai-message">CosmoAI is thinking<span class="animate-pulse">...</span></div>`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
});