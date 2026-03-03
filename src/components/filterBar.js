const STYLES = [
    { key: 'all', label: 'All Styles' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'luxury', label: 'Luxury' },
    { key: 'modern_tech', label: 'Modern Tech' },
    { key: 'bold', label: 'Bold' },
    { key: 'playful', label: 'Playful' },
    { key: 'abstract', label: 'Abstract' },
    { key: 'wordmark', label: 'Wordmark' },
    { key: 'icon_text', label: 'Icon + Text' },
    { key: 'emblem', label: 'Emblem' },
    { key: 'monogram', label: 'Monogram' }
];

export function renderFilterBar(container, activeFilter, onChange) {
    container.innerHTML = `
    <div class="filter-bar">
      ${STYLES.map(s => `
        <button class="pill${activeFilter === s.key ? ' pill--active' : ''}" data-filter="${s.key}">${s.label}</button>
      `).join('')}
    </div>
  `;

    container.querySelectorAll('.pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            onChange(filter);
        });
    });
}
