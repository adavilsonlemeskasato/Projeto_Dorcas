/* Carrega os componentes compartilhados em páginas estáticas. */
(async () => {
  const isNestedPage = /(?:^|\/)pages\//.test(window.location.pathname);
  const prefix = isNestedPage ? '../' : './';
  const resolvePath = (value) => `${prefix}${value}`;

  async function loadComponent(selector, file) {
    const target = document.querySelector(selector);
    if (!target) return;
    try {
      const response = await fetch(resolvePath(`components/${file}`));
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      target.innerHTML = await response.text();
      target.querySelectorAll('[data-link]').forEach((link) => {
        link.setAttribute('href', resolvePath(link.dataset.link));
      });
      if (selector === '[data-component="header"]') {
        const currentPath = window.location.pathname.replace(/\/$/, '/index.html');
        target.querySelectorAll('#main-nav a[data-link]').forEach((link) => {
          const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, '/index.html');
          link.classList.toggle('active', linkPath === currentPath);
        });
      }
      target.querySelectorAll('[data-src]').forEach((element) => {
        element.setAttribute('src', resolvePath(element.dataset.src));
      });
    } catch (error) {
      console.error(`Não foi possível carregar ${file}:`, error);
      target.innerHTML = '<p class="component-error">Não foi possível carregar este componente.</p>';
    }
  }

  await Promise.all([
    loadComponent('[data-component="header"]', 'header.html'),
    loadComponent('[data-component="footer"]', 'footer.html'),
  ]);

  document.dispatchEvent(new Event('components:ready'));
})();
