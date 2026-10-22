// Cardápio. Preços e ingredientes são exemplos: ajuste à vontade.
// Para usar foto real em um item, adicione `photo: 'assets/img/nome.jpg'` — ela substitui a ilustração.
(function () {
    const { burger, fries, rings, drink, shake } = window.Illus;

    window.MENU = [
        {
            id: 'smash',
            label: 'Smash Burgers',
            items: [
                { title: 'Smash Clássico', desc: 'Pão brioche, smash de 90g, queijo prato, picles e molho da casa.', price: 24.9, badge: 'Mais pedido', art: () => burger({ patties: 1, tomato: false, lettuce: false }) },
                { title: 'Duplo Burguerê', desc: 'Dois smash de 90g, cheddar duplo, cebola caramelizada e molho da casa.', price: 32.9, art: () => burger({ patties: 2, tomato: false, lettuce: false, onion: true }) },
                { title: 'Smash Bacon', desc: 'Smash de 90g, cheddar, bacon crocante e maionese defumada.', price: 29.9, art: () => burger({ patties: 1, bacon: true, tomato: false, lettuce: false }) },
                { title: 'Cheddar Melt', desc: 'Dois smash, cheddar cremoso derretido, cebola crispy e barbecue.', price: 34.9, badge: 'Novo', art: () => burger({ patties: 2, bacon: true, tomato: false }) },
            ],
        },
        {
            id: 'tradicionais',
            label: 'Burgers Tradicionais',
            items: [
                { title: 'Tradicional', desc: 'Blend Angus 160g, queijo, alface, tomate e maionese temperada.', price: 29.9, art: () => burger({ patties: 1 }) },
                { title: 'Cheese Salada', desc: 'Blend Angus 160g, queijo prato duplo, alface, tomate e cebola roxa.', price: 31.9, art: () => burger({ patties: 1, onion: true }) },
                { title: 'X-Bacon Artesanal', desc: 'Blend Angus 160g, cheddar, bacon em fatias e molho da casa.', price: 35.9, art: () => burger({ patties: 1, bacon: true }) },
                { title: 'Veggie de Grão-de-bico', desc: 'Burger de grão-de-bico e ervas, queijo, rúcula, tomate e maionese verde.', price: 28.9, art: () => burger({ patties: 1, veggie: true }) },
            ],
        },
        {
            id: 'acompanhamentos',
            label: 'Acompanhamentos',
            items: [
                { title: 'Batata Frita', desc: 'Porção crocante com sal e páprica defumada.', price: 14.9, badge: 'Clássico', art: () => fries() },
                { title: 'Batata Cheddar & Bacon', desc: 'Batata frita coberta com cheddar cremoso e farofa de bacon.', price: 21.9, art: () => fries() },
                { title: 'Onion Rings', desc: 'Anéis de cebola empanados e fritos na hora, com molho barbecue.', price: 18.9, art: () => rings() },
                { title: 'Mandioca Frita', desc: 'Palitos de mandioca macios por dentro, crocantes por fora.', price: 16.9, art: () => fries() },
            ],
        },
        {
            id: 'bebidas',
            label: 'Bebidas & Milkshakes',
            items: [
                { title: 'Milkshake de Chocolate', desc: 'Sorvete de baunilha, calda de chocolate belga e chantilly.', price: 19.9, badge: 'Favorito', art: () => shake('#6B3A22') },
                { title: 'Milkshake de Morango', desc: 'Sorvete de creme, morangos frescos e chantilly.', price: 19.9, art: () => shake('#F28DA6') },
                { title: 'Limonada Suíça', desc: 'Limão batido com leite condensado e gelo.', price: 10.9, art: () => drink('#E7E77A', '#880000') },
                { title: 'Refrigerante', desc: 'Lata 350ml. Pergunte pelos sabores disponíveis.', price: 6.9, art: () => drink('#3B1C12', '#880000') },
            ],
        },
    ];

    // Dá um id a cada item (usado no combo e nos links de pedido)
    window.MENU.forEach((cat) => cat.items.forEach((it, i) => { it.id = `${cat.id}-${i}`; it.category = cat.id; }));
})();
