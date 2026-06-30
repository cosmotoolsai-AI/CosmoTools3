// js/chat.js
let currentConversationId = null;
let messages = [];

// Load history from localStorage
function getConversations() {
  const saved = localStorage.getItem('cosmoConversations');
  return saved ? JSON.parse(saved) : [];
}

// Save conversations to localStorage
function saveConversations(conversations) {
  localStorage.setItem('cosmoConversations', JSON.stringify(conversations));
}

// Generate a simple ID
function generateId() {
  return 'conv-' + Date.now().toString(36);
}

// Load a specific conversation
window.loadConversation = function(convId) {
  const conversations = getConversations();
  const conv = conversations.find(c => c.id === convId);
  
  if (!conv) return;

  currentConversationId = convId;
  messages = conv.messages || [];

  // Switch UI
  document.getElementById('welcome').classList.add('hidden');
  const chatWindow = document.getElementById('chat-window');
  chatWindow.classList.remove('hidden');
  chatWindow.innerHTML = '';

  // Render all messages
  messages.forEach(msg => {
    addMessageToUI(msg.role, msg.content);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Save current chat as new conversation or update existing
function saveCurrentConversation(title = null) {
  if (messages.length < 2) return; // Don't save empty chats

  const conversations = getConversations();
  const now = new Date().toISOString();

  if (!currentConversationId) {
    // Create new conversation
    currentConversationId = generateId();
    const newConv = {
      id: currentConversationId,
      title: title || messages[0].content.substring(0, 40) + "...",
      messages: [...messages],
      createdAt: now,
      updatedAt: now
    };
    conversations.unshift(newConv);
  } else {
    // Update existing
    const conv = conversations.find(c => c.id === currentConversationId);
    if (conv) {
      conv.messages = [...messages];
      conv.updatedAt = now;
      if (!title && messages.length > 0) {
        conv.title = messages[0].content.substring(0, 40) + "...";
      }
    }
  }

  saveConversations(conversations);
  loadHistory(); // Refresh sidebar
}

// Render history list
window.loadHistory = function() {
  const container = document.getElementById('history-list');
  const conversations = getConversations();

  if (conversations.length === 0) {
    container.innerHTML = `<div class="text-zinc-500 text-sm p-4 text-center">No conversations yet</div>`;
    return;
  }

  container.innerHTML = conversations.map(conv => `
    <div onclick="loadConversation('${conv.id}')" 
         class="history-item px-4 py-3 rounded-2xl cursor-pointer text-sm">
      <div class="font-medium text-white line-clamp-1">${conv.title}</div>
      <div class="text-xs text-zinc-500 mt-1">
        ${new Date(conv.updatedAt).toLocaleDateString([], {month:'short', day:'numeric'})}
      </div>
    </div>
  `).join('');
};

// Add message to UI only
function addMessageToUI(role, content) {
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

// Main send function
window.sendMessage = async function() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  addMessageToUI('user', text);
  messages.push({ role: 'user', content: text });
  input.value = '';

  // Show chat window
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('chat-window').classList.remove('hidden');

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  const chatWindow = document.getElementById('chat-window');
  const typingDiv = document.createElement('div');
  typingDiv.id = typingId;
  typingDiv.className = 'flex justify-start';
  typingDiv.innerHTML = `<div class="ai-message">CosmoAI is thinking<span class="animate-pulse">...</span></div>`;
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  try {
    const response = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const reply = data.reply || "Got it! How else can I help you today?";

    // Remove typing
    document.getElementById(typingId)?.remove();

    // Add AI response
    addMessageToUI('ai', reply);
    messages.push({ role: 'ai', content: reply });

    // Auto-save conversation
    saveCurrentConversation();

  } catch (err) {
    document.getElementById(typingId)?.remove();
    const errorMsg = "Sorry, I'm having trouble connecting right now. Try again?";
    addMessageToUI('ai', errorMsg);
    messages.push({ role: 'ai', content: errorMsg });
  }
};

// Clear all history
window.clearHistory = function() {
  if (confirm("Clear all conversation history?")) {
    localStorage.removeItem('cosmoConversations');
    currentConversationId = null;
    messages = [];
    loadHistory();
  }
};

// Initialize when script loads
loadHistory();