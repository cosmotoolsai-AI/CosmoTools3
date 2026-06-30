const workflows = [
  { icon: "📝", title: "Write Proposal", prompt: "Write a professional business proposal for " },
  { icon: "💻", title: "Coding Help", prompt: "Help me write code for: " },
  { icon: "📚", title: "School Assignment", prompt: "Help me with this school assignment: " },
  { icon: "📊", title: "Business Plan", prompt: "Create a business plan for: " },
  { icon: "📧", title: "Professional Email", prompt: "Write a professional email about: " },
  { icon: "🔍", title: "Research", prompt: "Research and summarize: " }
];

window.loadWorkflows = function() {
  const container = document.getElementById('workflows-grid');
  container.innerHTML = workflows.map(w => `
    <div onclick="useWorkflow('${w.prompt}')" 
         class="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl cursor-pointer transition-colors">
      <div class="text-2xl mb-2">${w.icon}</div>
      <div class="font-medium">${w.title}</div>
    </div>
  `).join('');
};

window.useWorkflow = function(prompt) {
  document.getElementById('user-input').value = prompt;
  sendMessage();
};