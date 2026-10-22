// Hero em tela cheia animado com anime.js (v4, bundle UMD => global `anime`).
(function () {
    const hero = document.getElementById('inicio');
    const burgerBox = document.getElementById('hero-burger');
    const stage = hero.querySelector('.hero__stage');
    const title = hero.querySelector('.hero__title');

    // Sem anime.js (ex.: arquivo não carregou) mostra tudo parado em vez de deixar o hero escondido
    if (!window.anime) {
        document.documentElement.classList.remove('js');
    }

    burgerBox.innerHTML = window.Illus.burger({ patties: 2, onion: true });

    // ----- título: cada palavra vira uma "máscara" para o efeito de subir -----
    title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());

    function wrapWords(node) {
        [...node.childNodes].forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) return wrapWords(child);
            if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;

            const frag = document.createDocumentFragment();
            child.textContent.split(/\s+/).filter(Boolean).forEach((word, i, all) => {
                const outer = document.createElement('span');
                outer.className = 'w';
                outer.setAttribute('aria-hidden', 'true');
                outer.innerHTML = `<span>${word}</span>`;
                frag.append(outer);
                if (i < all.length - 1 || child.textContent.endsWith(' ')) frag.append(' ');
            });
            if (/^\s/.test(child.textContent)) frag.prepend(' ');
            child.replaceWith(frag);
        });
    }
    wrapWords(title);

    // ----- ingredientes flutuando em volta do burger -----
    // [tipo, left %, top %, escala]
    const BITS = [
        ['tomato', 3, 20, 1], ['leaf', 88, 60, 1], ['seed', 10, 70, 1], ['seed', 80, 26, 1],
        ['pickle', 16, 88, 1], ['seed', 72, 92, 1], ['leaf', 0, 50, 0.8], ['tomato', 84, 82, 0.7],
        ['seed', 38, 3, 1], ['pickle', 62, 1, 1],
    ];
    BITS.forEach(([type, left, top, scale]) => {
        const el = document.createElement('span');
        el.className = `bit bit--${type}`;
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;
        el.dataset.scale = scale;
        stage.append(el);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.anime || reduceMotion) {
        stage.querySelectorAll('.bit').forEach((el) => (el.style.opacity = 1));
        return;
    }

    const { animate, createTimeline, stagger, utils } = window.anime;
    const loops = [];

    // estado inicial das partes que só existem depois do JS
    utils.set('.hero__burger .drip', { scaleY: 0 });

    // ----- entrada -----
    createTimeline({ defaults: { ease: 'outExpo', duration: 900 }, onComplete: startLoops })
        .add('.hero__disc', { scale: [0, 1], duration: 1000, ease: 'outBack' }, 0)
        .add('.hero__eyebrow', { opacity: [0, 1], translateY: [16, 0] }, 150)
        .add('.hero__title .w > span', { translateY: ['110%', '0%'], delay: stagger(70), duration: 800 }, 250)
        .add('.hero__lead', { opacity: [0, 1], translateY: [16, 0] }, 750)
        .add('.hero__actions .btn', { opacity: [0, 1], translateY: [16, 0], delay: stagger(100) }, 900)
        // burger montando de baixo para cima: cada camada cai e quica no lugar
        .add('.hero__burger .layer', { translateY: [-420, 0], delay: stagger(130), duration: 900, ease: 'outBounce' }, 350)
        .add('.hero__burger .layer', { opacity: [0, 1], delay: stagger(130), duration: 180, ease: 'linear' }, 350)
        // queijo escorrendo quando o burger termina de montar
        .add('.hero__burger .drip', { scaleY: [0, 1], delay: stagger(160), duration: 1300, ease: 'outElastic(1, .6)' }, 1500)
        .add('.hero__badge', { opacity: [0, 1], scale: [0.3, 1], rotate: [-120, 0], duration: 1000, ease: 'outBack' }, 1700)
        .add('.bit', { opacity: [0, 1], scale: (el) => [0, Number(el.dataset.scale)], delay: stagger(90), duration: 700, ease: 'outBack' }, 1800);

    // ----- movimento contínuo depois da entrada -----
    function startLoops() {
        loops.push(
            animate('.hero__burger', { translateY: [0, -14], rotate: [-1.2, 1.2], duration: 3200, ease: 'inOutSine', loop: true, alternate: true }),
            animate('.hero__burger .shadow', { scaleX: [1, 0.88], opacity: [0.18, 0.1], duration: 3200, ease: 'inOutSine', loop: true, alternate: true }),
            animate('.hero__badge', { rotate: [0, 360], duration: 20000, ease: 'linear', loop: true }),
        );

        stage.querySelectorAll('.bit').forEach((el) => {
            loops.push(animate(el, {
                translateY: [0, utils.random(-22, -8)],
                rotate: [utils.random(-25, 0), utils.random(5, 30)],
                duration: utils.random(2600, 4800),
                ease: 'inOutSine',
                loop: true,
                alternate: true,
            }));
        });

        // parallax suave com o mouse (só em dispositivos com ponteiro preciso)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            hero.addEventListener('pointermove', (e) => {
                const r = stage.getBoundingClientRect();
                const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
                const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
                animate('.hero__burger .ill', { translateX: dx * 22, translateY: dy * 16, duration: 700, ease: 'out(3)' });
                animate('.hero__disc', { translateX: dx * -26, translateY: dy * -18, duration: 900, ease: 'out(3)' });
            });
        }

        // pausa os loops quando o hero sai da tela
        new IntersectionObserver(([entry]) => {
            loops.forEach((a) => (entry.isIntersecting ? a.play() : a.pause()));
        }).observe(hero);
    }
})();
