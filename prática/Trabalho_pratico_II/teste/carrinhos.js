let cartItems = [];
let selectedEventId = null;

function showHome() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Próximos Eventos</h1>
        <div class="product">
            <h3>Evento 1</h3>
            <p>Descrição do Evento 1</p>
            <p>R$100.00</p>
            <button onclick="addToCart(1, 'Evento 1', 100.00)">Adicionar ao Carrinho</button>
        </div>
        <div class="product">
            <h3>Evento 2</h3>
            <p>Descrição do Evento 2</p>
            <p>R$150.00</p>
            <button onclick="addToCart(2, 'Evento 2', 150.00)">Adicionar ao Carrinho</button>
        </div>
    `;
}

function showCart() {
    toggleCart();
}

function showCheckout() {
    const content = document.getElementById('content');
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    content.innerHTML = `
        <h1>Checkout</h1>
        <p>Total: R$${total.toFixed(2)}</p>
        <button onclick="placeOrder()">Finalizar Compra</button>
    `;
}

function addToCart(id, name, price) {
    cartItems.push({ id, name, price });
    updateCart();
    alert(${name} adicionado ao carrinho);
}

function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length;

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>R$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartItemsContainer.appendChild(div);
    });
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}

function placeOrder() {
    alert('Pedido realizado com sucesso!');
    cartItems = [];
    updateCart();
    showHome();
}

document.getElementById('cart-icon').addEventListener('click', toggleCart);

// Função para abrir o modal com as informações do evento selecionado
function openModal(eventId) {
    selectedEventId = eventId;
    fetch(http://localhost:8080/eventos/listar/${eventId})
        .then(response => response.json())
        .then(evento => {
            // Formatar a data do evento
            const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            // Preencha os dados do modal com as informações do evento
            document.getElementById('modalNome').textContent = evento.nome;
            document.getElementById('modalData').textContent = Data: ${dataFormatada};
            document.getElementById('modalLocal').textContent = Local: ${evento.localizacao};
            document.getElementById('modalDescricao').textContent = Descrição: ${evento.descricao};

            // Aqui você fará outra requisição para buscar os detalhes do bilhete associado ao evento
            fetch(http://localhost:8080/bilhetes/evento/${eventId})
                .then(response => response.json())
                .then(bilhete => {
                    document.getElementById('modalPreco').textContent = Preço: ${bilhete.preco} €;
                    document.getElementById('comprarBilhete').onclick = () => addToCart(eventId, evento.nome, bilhete.preco);
                })
                .catch(error => {
                    console.error("Erro ao buscar os detalhes do bilhete:", error);
                });

            // Exiba o modal
            document.getElementById('myModal').style.display = 'block';
        })
        .catch(error => {
            console.error("Erro ao buscar os detalhes do evento:", error);
        });
}

function closeModal() {
    // Oculte o modal
    document.getElementById('myModal').style.display = 'none';
}

// Inicializa a página inicial
document.addEventListener("DOMContentLoaded", showHome);