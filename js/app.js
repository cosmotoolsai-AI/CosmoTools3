import { initSearch } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadWorkflows();
  initSearch();
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.getElementById('user-input') !== document.activeElement) {
      e.preventDefault();
      toggleSearch();
    }
  });

  console.log('%c🚀 CosmoTools v1 ready', 'color: violet; font-size: 14px;');
});