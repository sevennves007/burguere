const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav-menu');

function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

// Abre/fecha ao clicar no botão
toggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
});

// Fecha ao clicar em um link
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Fecha com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// Fecha se a tela voltar ao tamanho desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenu(false);
});