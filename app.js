(async () => {
  const grid = document.getElementById('game-grid');
  const search = document.getElementById('search');
  const tagsEl = document.getElementById('tags');
  const themeBtn = document.getElementById('theme-toggle');

  // 加载游戏注册表
  const games = await fetch('games/registry.json').then(r => r.json());

  // 提取所有标签
  const allTags = [...new Set(games.flatMap(g => g.tags))];
  let activeTag = null;

  function renderTags() {
    tagsEl.innerHTML =
      `<button class="${!activeTag ? 'active' : ''}" data-tag="">全部</button>` +
      allTags.map(t =>
        `<button class="${activeTag === t ? 'active' : ''}" data-tag="${t}">${t}</button>`
      ).join('');
  }

  tagsEl.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    activeTag = e.target.dataset.tag || null;
    renderTags();
    renderGrid();
  });

  // 渲染游戏卡片
  function renderGrid() {
    const q = search.value.toLowerCase();
    const filtered = games.filter(g =>
      (!activeTag || g.tags.includes(activeTag)) &&
      (!q || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q))
    );

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="text-align:center;opacity:.5;grid-column:1/-1;">没有找到匹配的游戏 🎮</p>';
      return;
    }

    grid.innerHTML = filtered.map(g => `
      <div class="card">
        <div class="card-thumb" style="background:linear-gradient(135deg,${g.color},#764ba2)">
          ${g.icon || '🎮'}
        </div>
        <div class="card-body">
          <h3>${g.name}</h3>
          <p>${g.description}</p>
          <div class="card-tags">
            ${g.tags.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <a class="play-btn" href="${g.path}">▶ 开始游戏</a>
      </div>
    `).join('');
  }

  search.addEventListener('input', renderGrid);

  // 深色模式
  const saved = localStorage.getItem('arcade-theme');
  if (saved === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? '' : 'dark';
    themeBtn.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('arcade-theme', isDark ? 'light' : 'dark');
  });

  renderTags();
  renderGrid();
})();
