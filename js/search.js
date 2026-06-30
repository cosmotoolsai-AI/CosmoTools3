// js/search.js
let allWorkflows = [];

export async function initSearch() {
  try {
    const res = await fetch('data/workflows.json');
    allWorkflows = await res.json();
  } catch (e) {
    console.error("Failed to load workflows for search");
  }
}

export function filterWorkflows(query) {
  if (!query) {
    return allWorkflows;
  }
  
  const q = query.toLowerCase();
  return allWorkflows.filter(workflow => 
    workflow.title.toLowerCase().includes(q) || 
    workflow.description.toLowerCase().includes(q)
  );
}

// Global search modal (simple version)
window.toggleSearch = function() {
  const query = prompt("Search workflows or ask anything:");
  if (!query) return;
  
  const results = filterWorkflows(query);
  
  if (results.length > 0) {
    // Auto-use the best match
    useWorkflow(results[0].title, results[0].prompt);
  } else {
    // Fall back to chat
    document.getElementById('user-input').value = query;
    sendMessage(); window.filterWorkflows = filterWorkflows;
  }
};