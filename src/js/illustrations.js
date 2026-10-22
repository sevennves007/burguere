// Ilustrações em SVG usadas no lugar das fotos enquanto você não tem as fotos reais.
// Cada item do cardápio pode trocar a ilustração por uma foto com `photo: 'assets/img/x.jpg'` em data.js.
(function () {
    let uid = 0;

    // Rótulo único por instância: ids de gradiente repetidos quebram quando o primeiro SVG está em um painel escondido.
    const nextId = () => `ill${++uid}`;

    const wrap = (inner, cls = '') =>
        `<svg class="ill ${cls}" viewBox="0 0 400 400" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

    const SESAME = [
        [112, 26, -20], [160, 14, 10], [210, 10, -10], [262, 16, 25], [300, 30, -15],
        [136, 50, 30], [188, 40, -25], [240, 42, 15], [286, 58, -30], [160, 72, 5], [220, 70, -12],
    ];

    function layerBunBottom(id, yt, yb) {
        return `<path d="M48 ${yt + 6} Q48 ${yt} 56 ${yt} H344 Q352 ${yt} 352 ${yt + 6} V${yb - 20} Q352 ${yb} 326 ${yb} H74 Q48 ${yb} 48 ${yb - 20} Z" fill="url(#${id}-bunb)"/>
            <path d="M60 ${yb - 8} H340" stroke="#B8651B" stroke-opacity=".35" stroke-width="4" stroke-linecap="round"/>`;
    }

    function layerPatty(id, yt, yb) {
        const m = (yt + yb) / 2;
        const bumps = [[70, 0.3], [120, 0.7], [182, 0.25], [236, 0.75], [290, 0.35], [336, 0.6]]
            .map(([x, k]) => `<ellipse cx="${x}" cy="${yt + (yb - yt) * k}" rx="${9 + (x % 7)}" ry="4" fill="#7A4326" opacity=".7"/>`)
            .join('');
        return `<path d="M34 ${m} Q34 ${yt + 2} 68 ${yt} H332 Q366 ${yt + 2} 366 ${m} Q366 ${yb} 332 ${yb} H68 Q34 ${yb} 34 ${m} Z" fill="url(#${id}-patty)"/>${bumps}`;
    }

    function layerCheese(yt) {
        return `<g class="cheese">
            <path d="M32 ${yt} H368 V${yt + 8} Q368 ${yt + 16} 358 ${yt + 16} H64 Q32 ${yt + 16} 32 ${yt + 8} Z" fill="#FFC72C"/>
            <g class="drip"><path d="M312 ${yt + 12} H336 V${yt + 40} Q336 ${yt + 54} 324 ${yt + 54} Q312 ${yt + 54} 312 ${yt + 40} Z" fill="#FFC72C"/>
            <path d="M96 ${yt + 12} H118 V${yt + 28} Q118 ${yt + 38} 107 ${yt + 38} Q96 ${yt + 38} 96 ${yt + 28} Z" fill="#FFC72C"/></g>
            <path d="M52 ${yt + 4} H220" stroke="#FFE27A" stroke-width="4" stroke-linecap="round"/></g>`;
    }

    function layerBacon(yt) {
        return `<path d="M40 ${yt + 6} q20 -14 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V${yt + 18} q-20 -14 -40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 t-40 0 Z" fill="#B23A24"/>
            <path d="M44 ${yt + 9} q18 -10 36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0 t36 0" fill="none" stroke="#E9987C" stroke-width="3" stroke-linecap="round"/>`;
    }

    function layerTomato(yt, yb) {
        const h = yb - yt;
        return `<rect x="54" y="${yt}" width="292" height="${h}" rx="${h / 2}" fill="#D6342A"/>
            <rect x="70" y="${yt + 4}" width="260" height="${h * 0.34}" rx="${h * 0.17}" fill="#EE5B47"/>`;
    }

    function layerLettuce(yt, yb) {
        const step = 332 / 11;
        let d = `M34 ${yb} L34 ${yt + 12}`;
        for (let i = 0; i < 11; i++) {
            const x = 34 + step * i;
            d += ` Q${x + step / 2} ${yt - 10 + (i % 2) * 7} ${x + step} ${yt + 12}`;
        }
        d += ` L366 ${yb} Z`;
        return `<path d="${d}" fill="#5FA83A"/><path d="M44 ${yb - 8} H356" stroke="#86C95A" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
    }

    function layerOnion(yt, yb) {
        return `<rect x="70" y="${yt}" width="260" height="${yb - yt}" rx="${(yb - yt) / 2}" fill="#F3D9F0"/>
            <path d="M92 ${(yt + yb) / 2} H308" stroke="#C47AC0" stroke-width="3" stroke-linecap="round" stroke-dasharray="46 14"/>`;
    }

    function layerBunTop(id, yt, yb) {
        const seeds = SESAME.map(([x, dy, r]) =>
            `<ellipse cx="${x}" cy="${yt + 14 + dy}" rx="8" ry="4.2" fill="#FFF2D2" transform="rotate(${r} ${x} ${yt + 14 + dy})"/>`).join('');
        return `<path d="M44 ${yb} C38 ${yt + 22} 110 ${yt} 200 ${yt} C290 ${yt} 362 ${yt + 22} 356 ${yb} Q356 ${yb + 8} 340 ${yb + 8} H60 Q44 ${yb + 8} 44 ${yb} Z" fill="url(#${id}-buna)"/>
            <ellipse cx="136" cy="${yt + 34}" rx="46" ry="14" fill="#fff" opacity=".22" transform="rotate(-18 136 ${yt + 34})"/>${seeds}`;
    }

    /**
     * Hambúrguer em camadas. Cada camada é um <g class="layer"> (de baixo para cima) para o hero poder animar.
     * opts: patties (1|2), cheese, bacon, tomato, lettuce, onion, veggie
     */
    function burger(opts = {}) {
        const o = { patties: 1, cheese: true, bacon: false, tomato: true, lettuce: true, onion: false, veggie: false, ...opts };
        const id = nextId();
        const layers = [];
        let cursor = 352;
        const push = (h, overlap, draw, name) => {
            const yb = cursor + overlap;
            const yt = yb - h;
            layers.push(`<g class="layer layer--${name}">${draw(yt, yb)}</g>`);
            cursor = yt;
        };

        push(48, 0, (yt, yb) => layerBunBottom(id, yt, yb), 'bun-bottom');
        for (let i = 0; i < o.patties; i++) {
            push(46, 8, (yt, yb) => layerPatty(id, yt, yb), 'patty');
            if (o.cheese) push(18, -4, (yt) => layerCheese(yt), 'cheese');
        }
        if (o.bacon) push(18, 2, (yt) => layerBacon(yt), 'bacon');
        if (o.onion) push(14, 2, (yt, yb) => layerOnion(yt, yb), 'onion');
        if (o.tomato) push(24, 4, (yt, yb) => layerTomato(yt, yb), 'tomato');
        if (o.lettuce) push(28, 4, (yt, yb) => layerLettuce(yt, yb), 'lettuce');
        push(118, 6, (yt, yb) => layerBunTop(id, yt, yb), 'bun-top');

        const pattyFill = o.veggie ? ['#7C6A2E', '#5A4A1C'] : ['#6A3820', '#3F1E10'];
        const defs = `<defs>
            <linearGradient id="${id}-buna" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6BE5C"/><stop offset="1" stop-color="#D98228"/></linearGradient>
            <linearGradient id="${id}-bunb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EBA445"/><stop offset="1" stop-color="#C7701F"/></linearGradient>
            <linearGradient id="${id}-patty" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pattyFill[0]}"/><stop offset="1" stop-color="${pattyFill[1]}"/></linearGradient>
        </defs>`;
        const shadow = '<ellipse class="shadow" cx="200" cy="372" rx="150" ry="11" fill="#222" opacity=".18"/>';
        return wrap(defs + shadow + layers.join(''), 'ill--burger');
    }

    function fries() {
        const sticks = [
            [128, 96, 128, -16], [152, 80, 150, -9], [176, 70, 160, -3], [200, 64, 168, 2], [224, 72, 158, 7], [248, 84, 146, 13], [270, 100, 124, 19],
            [140, 112, 120, -11], [190, 98, 134, 4], [236, 108, 124, 10], [168, 120, 112, -6], [214, 124, 108, 6],
        ].map(([x, y, h, r], i) =>
            `<rect x="${x}" y="${y}" width="24" height="${h}" rx="5" fill="${i % 2 ? '#F7C948' : '#F2BC34'}" transform="rotate(${r} ${x + 12} ${y + h})"/>`).join('');
        return wrap(`<ellipse cx="200" cy="372" rx="120" ry="10" fill="#222" opacity=".18"/>${sticks}
            <path d="M106 208 H294 L276 352 Q274 364 262 364 H138 Q126 364 124 352 Z" fill="#880000"/>
            <path d="M112 252 H288 L284 282 H116 Z" fill="#FFEABD"/>
            <text x="200" y="276" text-anchor="middle" font-family="Anton, sans-serif" font-size="24" fill="#880000" letter-spacing="2">BURGUERÊ</text>`, 'ill--fries');
    }

    function rings() {
        const ring = (cx, cy, rot) => `<g transform="rotate(${rot} ${cx} ${cy})">
            <path fill-rule="evenodd" d="M${cx - 88} ${cy} a88 56 0 1 0 176 0 a88 56 0 1 0 -176 0 Z M${cx - 48} ${cy} a48 26 0 1 1 96 0 a48 26 0 1 1 -96 0 Z" fill="#E3A23B"/>
            <path d="M${cx - 76} ${cy - 12} q20 -34 70 -38" fill="none" stroke="#F6CE7E" stroke-width="6" stroke-linecap="round"/>
            <circle cx="${cx + 52}" cy="${cy + 30}" r="4" fill="#B97A1F"/><circle cx="${cx - 30}" cy="${cy + 38}" r="3.5" fill="#B97A1F"/></g>`;
        return wrap(`<ellipse cx="200" cy="360" rx="150" ry="10" fill="#222" opacity=".18"/>${ring(200, 300, 0)}${ring(150, 230, -12)}${ring(252, 210, 14)}`, 'ill--rings');
    }

    function drink(color = '#3B1C12', band = '#880000') {
        const id = nextId();
        return wrap(`<defs><clipPath id="${id}"><path d="M120 150 H280 L262 352 Q260 364 248 364 H152 Q140 364 138 352 Z"/></clipPath></defs>
            <ellipse cx="200" cy="376" rx="96" ry="9" fill="#222" opacity=".18"/>
            <path d="M120 150 H280 L262 352 Q260 364 248 364 H152 Q140 364 138 352 Z" fill="#fff" opacity=".85"/>
            <g clip-path="url(#${id})"><rect x="100" y="178" width="200" height="200" fill="${color}"/>
            <rect x="170" y="200" width="44" height="44" rx="9" fill="#fff" opacity=".28" transform="rotate(14 192 222)"/>
            <rect x="214" y="250" width="40" height="40" rx="8" fill="#fff" opacity=".25" transform="rotate(-10 234 270)"/>
            <path d="M110 250 H290 L284 306 H116 Z" fill="${band}" opacity=".92"/></g>
            <rect x="110" y="136" width="180" height="20" rx="10" fill="#222"/>
            <path d="M232 138 L262 40" stroke="#880000" stroke-width="12" stroke-linecap="round"/>`, 'ill--drink');
    }

    function shake(color = '#6B3A22', cream = '#FFF6E6') {
        const id = nextId();
        return wrap(`<defs><clipPath id="${id}"><path d="M112 168 H288 L266 350 Q264 364 250 364 H150 Q136 364 134 350 Z"/></clipPath></defs>
            <ellipse cx="200" cy="376" rx="96" ry="9" fill="#222" opacity=".18"/>
            <path d="M112 168 H288 L266 350 Q264 364 250 364 H150 Q136 364 134 350 Z" fill="#fff" opacity=".8"/>
            <g clip-path="url(#${id})"><rect x="100" y="186" width="200" height="190" fill="${color}"/>
            <ellipse cx="170" cy="260" rx="9" ry="30" fill="#fff" opacity=".18"/></g>
            <path d="M236 150 L268 36" stroke="#880000" stroke-width="12" stroke-linecap="round"/>
            <ellipse cx="200" cy="164" rx="98" ry="22" fill="${cream}"/>
            <ellipse cx="200" cy="136" rx="76" ry="22" fill="${cream}"/>
            <ellipse cx="200" cy="110" rx="52" ry="20" fill="${cream}"/>
            <path d="M148 138 q16 28 20 6 M228 142 q14 24 22 4" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
            <circle cx="200" cy="82" r="17" fill="#C41E3A"/><path d="M200 66 q10 -22 24 -26" fill="none" stroke="#3E6B2A" stroke-width="4" stroke-linecap="round"/>`, 'ill--shake');
    }

    window.Illus = { burger, fries, rings, drink, shake };
})();
