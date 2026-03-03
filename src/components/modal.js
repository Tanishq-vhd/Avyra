export function showModal({ title, content, footer, onClose, wide }) {
    const root = document.getElementById('modal-root');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
    <div class="modal${wide ? ' modal--wide' : ''}" style="${wide ? 'max-width:640px' : ''}">
      <div class="modal__header">
        <h3 class="modal__title">${title}</h3>
        <button class="modal__close" id="modal-close-btn">✕</button>
      </div>
      <div class="modal__body">${content}</div>
      ${footer ? `<div class="modal__footer">${footer}</div>` : ''}
    </div>
  `;

    root.appendChild(overlay);

    const close = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 200);
        if (onClose) onClose();
    };

    overlay.querySelector('#modal-close-btn').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    return { close, element: overlay };
}

export function closeAllModals() {
    const root = document.getElementById('modal-root');
    root.innerHTML = '';
}
