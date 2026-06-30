async function loadWorkflows() {
  const res = await fetch('data/workflows.json');
  const workflows = await res.json();
  
  const container = document.getElementById('workflows-grid');
  container.innerHTML = workflows.map(w => `
    <div onclick="useWorkflow('${w.title}', '${w.prompt}')" 
         class="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl cursor-pointer transition-all">
      <div class="text-2xl mb-2">${w.icon}</div>
      <div class="font-medium">${w.title}</div>
      <div class="text-xs text-zinc-400 line-clamp-2">${w.description}</div>
    </div>
  `).join('');
}

function useWorkflow(title, prompt) {
  document.getElementById('user-input').value = prompt;
  sendMessage();export async function loadWorkflows() { ... }   // keep your existing code

export function useWorkflow(title, prompt) { ... }  // keep existing
}