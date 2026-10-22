// Cardápio com abas (padrão ARIA tablist: setas, Home e End navegam entre as abas).
(function () {
    const { currency, waLink } = window.BURGUERE;
    const tabsEl = document.getElementById('menu-tabs');
    const panel = document.getElementById('menu-panel');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;

    tabsEl.innerHTML = window.MENU.map((cat, i) =>
        `<button class="tab" role="tab" id="tab-${cat.id}" aria-controls="menu-panel" aria-selected="false" tabindex="-1" data-i="${i}">${cat.label}</button>`).join('');
    const tabs = [...tabsEl.querySelectorAll('.tab')];

    function cardHTML(item) {
        const media = item.photo ? `<img src="${item.photo}" alt="${item.title}" loading="lazy" />` : item.art();
        const badge = item.badge ? `<span class="card__badge">${item.badge}</span>` : '';
        const href = waLink(`Olá! Quero pedir: 1x ${item.title} (${currency.format(item.price)})`);
        return `<article class="card">
            <div class="card__media">${media}${badge}</div>
            <div class="card__body">
                <h3 class="card__title">${item.title}</h3>
                <p class="card__desc">${item.desc}</p>
                <div class="card__foot">
                    <span class="card__price">${currency.format(item.price)}</span>
                    <a class="card__add" href="${href}" target="_blank" rel="noopener" aria-label="Pedir ${item.title} pelo WhatsApp">Pedir +</a>
                </div>
            </div>
        </article>`;
    }

    function select(i, { focus = false, animateCards = true } = {}) {
        current = i;
        tabs.forEach((tab, n) => {
            const on = n === i;
            tab.setAttribute('aria-selected', on);
            tab.tabIndex = on ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.innerHTML = window.MENU[i].items.map(cardHTML).join('');
        if (focus) tabs[i].focus();

        // centraliza a aba ativa quando as abas rolam na horizontal (celular).
        // Rola só o container das abas: scrollIntoView arrastaria a página inteira.
        if (tabsEl.scrollWidth > tabsEl.clientWidth) {
            const tab = tabs[i];
            tabsEl.scrollTo({ left: tab.offsetLeft - (tabsEl.clientWidth - tab.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
        }

        if (animateCards && !reduceMotion && window.anime) {
            window.anime.animate('#menu-panel .card', {
                opacity: [0, 1],
                translateY: [28, 0],
                delay: window.anime.stagger(70),
                duration: 650,
                ease: 'outCubic',
            });
        }
    }

    tabsEl.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (tab && Number(tab.dataset.i) !== current) select(Number(tab.dataset.i));
    });

    tabsEl.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        const next = { ArrowRight: current === last ? 0 : current + 1, ArrowLeft: current === 0 ? last : current - 1, Home: 0, End: last }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select(next, { focus: true });
    });

    select(0, { animateCards: false });
})();
