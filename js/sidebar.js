function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="p-6">
      <div class="flex items-center gap-3 mb-10">
        <span class="text-3xl">🪐</span>
        <span class="text-2xl font-bold">CosmoTools</span>
      </div>
      
      <nav class="space-y-1">
        <div class="nav-item bg-zinc-800"><span>💬</span> AI Chat</div>
        <div class="nav-item"><span>📄</span> Documents</div>
        <div class="nav-item"><span>💻</span> Coding</div>
        <div class="nav-item"><span>📈</span> Business</div>
        <div class="nav-item"><span>📢</span> Marketing</div>
        <div class="nav-item"><span>🔬</span> Research</div>
        <div class="nav-item"><span>⭐</span> Favorites</div>
      </nav>
    </div>
  `;
}