// Configurações do negócio — edite aqui, o resto do site lê daqui.
window.BURGUERE = {
    // WhatsApp no formato internacional, só números (55 + DDD + número)
    whatsapp: '5511999999999',

    // Link de delivery próprio (opcional). Se preenchido, o botão "Pedir Agora" do hero usa ele
    // no lugar do WhatsApp.
    deliveryUrl: '',

    // Desconto aplicado ao montar o combo (0.10 = 10%)
    comboDiscount: 0.1,

    currency: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
};

window.BURGUERE.waLink = function (message) {
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${window.BURGUERE.whatsapp}${text}`;
};
