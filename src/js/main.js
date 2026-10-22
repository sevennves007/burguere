(function () {
    const { waLink, deliveryUrl } = window.BURGUERE;

    // ----- links de pedido -----
    // "Pedir Agora" usa o delivery próprio se existir; o resto vai para o WhatsApp
    document.querySelectorAll('[data-order]').forEach((a) => {
        a.href = deliveryUrl || waLink('Olá! Quero fazer um pedido no Burguerê 🍔');
        a.target = '_blank';
        a.rel = 'noopener';
    });
    document.querySelectorAll('[data-wa]').forEach((a) => {
        a.href = waLink('Olá! Vim pelo site do Burguerê.');
        a.target = '_blank';
        a.rel = 'noopener';
    });

    // ----- altura real do header para o hero ocupar exatamente a tela -----
    const header = document.querySelector('.header');
    const setHeaderHeight = () => document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    if (document.fonts) document.fonts.ready.then(setHeaderHeight);

    document.getElementById('year').textContent = new Date().getFullYear();

    // ----- revelar seções ao rolar -----
    const items = [...document.querySelectorAll('[data-reveal]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!window.anime || reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach((el) => (el.style.opacity = 1));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            observer.unobserve(el);
            // irmãos que entram juntos (ex.: os 3 cards) aparecem em cascata
            const order = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')).indexOf(el);
            window.anime.animate(el, { opacity: [0, 1], translateY: [30, 0], duration: 800, delay: order * 110, ease: 'outCubic' });
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
})();
