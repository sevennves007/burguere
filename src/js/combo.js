// "Monte o seu combo": escolhe burger + acompanhamento + bebida, mostra o total com desconto
// e monta a mensagem do pedido para o WhatsApp.
(function () {
    const { currency, waLink, comboDiscount } = window.BURGUERE;

    const byCategory = (...ids) => window.MENU.filter((c) => ids.includes(c.id)).flatMap((c) => c.items);
    const groups = {
        burger: { el: document.getElementById('combo-burger'), items: byCategory('smash', 'tradicionais') },
        side: { el: document.getElementById('combo-side'), items: byCategory('acompanhamentos') },
        drink: { el: document.getElementById('combo-drink'), items: byCategory('bebidas') },
    };
    const choice = {};

    Object.entries(groups).forEach(([key, { el, items }]) => {
        choice[key] = items[0];
        el.innerHTML = items.map((it, i) =>
            `<label class="chip">
                <input type="radio" name="combo-${key}" value="${it.id}" ${i === 0 ? 'checked' : ''} />
                <span>${it.title}<small>${currency.format(it.price)}</small></span>
            </label>`).join('');
        el.addEventListener('change', (e) => {
            choice[key] = items.find((it) => it.id === e.target.value);
            render();
        });
    });

    const listEl = document.getElementById('combo-list');
    const oldEl = document.getElementById('combo-old');
    const newEl = document.getElementById('combo-new');
    const tagEl = document.getElementById('combo-tag');
    const orderEl = document.getElementById('combo-order');

    function render() {
        const picked = [choice.burger, choice.side, choice.drink];
        const subtotal = picked.reduce((sum, it) => sum + it.price, 0);
        const total = subtotal * (1 - comboDiscount);

        listEl.innerHTML = picked.map((it) =>
            `<li>
                <span class="thumb">${it.photo ? `<img src="${it.photo}" alt="" />` : it.art()}</span>
                <span class="name">${it.title}</span>
                <b>${currency.format(it.price)}</b>
            </li>`).join('');

        tagEl.textContent = `${Math.round(comboDiscount * 100)}% de desconto no combo`;
        oldEl.textContent = currency.format(subtotal);
        newEl.textContent = currency.format(total);
        orderEl.href = waLink(
            `Olá! Quero pedir o combo: ${picked.map((it) => it.title).join(' + ')}. Total: ${currency.format(total)} (${Math.round(comboDiscount * 100)}% off).`,
        );
    }

    render();
})();
