let toastContainer;

function ensureContainer() {
    toastContainer = document.getElementById('toast-root');
    if (!toastContainer.querySelector('.toast-container')) {
        toastContainer.innerHTML = '<div class="toast-container"></div>';
    }
    return toastContainer.querySelector('.toast-container');
}

export function showToast(message, type = 'default', duration = 3500) {
    const container = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast${type !== 'default' ? ` toast--${type}` : ''}`;
    toast.innerHTML = `
    <span>${message}</span>
    <span class="toast__dismiss">✕</span>
  `;

    container.appendChild(toast);

    toast.querySelector('.toast__dismiss').addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 200);
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 200);
        }
    }, duration);
}
