document.addEventListener('DOMContentLoaded', () => {

    // Busca
    const searchInput = document.querySelector('.search');
    const cards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const termo = searchInput.value.toLowerCase().trim();
            cards.forEach(card => {
                const texto = (card.dataset.name + ' ' + card.dataset.type).toLowerCase();
                card.style.display = (termo === '' || texto.includes(termo)) ? 'flex' : 'none';
            });
        });
    }

    // Carrinho
    let cart = JSON.parse(localStorage.getItem('adidasCart')) || [];

    const cartCount = document.getElementById('cart-count');
    const cartPanel = document.getElementById('cart-panel');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function updateCartUI() {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = totalQty;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align:center; padding:40px 0; color:#888;">Carrinho vazio</p>';
            cartTotal.textContent = '';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.qty;
            total += subtotal;
            html += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>R$ ${item.price.toFixed(2).replace('.', ',')} × ${item.qty}</small>
                    </div>
                    <div>
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <button onclick="changeQty(${index}, 1)">+</button>
                        <button onclick="removeItem(${index})">×</button>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = html;
        cartTotal.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
    }

    window.changeQty = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        localStorage.setItem('adidasCart', JSON.stringify(cart));
        updateCartUI();
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('adidasCart', JSON.stringify(cart));
        updateCartUI();
    };

    function addToCart(card) {
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const existing = cart.find(item => item.name === name);

        if (existing) existing.qty++;
        else cart.push({ name, price, qty: 1 });

        localStorage.setItem('adidasCart', JSON.stringify(cart));
        updateCartUI();
    }

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            addToCart(card);
            btn.textContent = 'Adicionado ✓';
            setTimeout(() => btn.textContent = 'Adicionar', 800);
        });
    });

    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            addToCart(card);
            window.location.href = 'finalizar.html';
        });
    });

    document.getElementById('cart-btn').addEventListener('click', (e) => {
        e.preventDefault();
        cartPanel.style.display = 'block';
        updateCartUI();
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        cartPanel.style.display = 'none';
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        if (confirm('Deseja limpar o carrinho?')) {
            cart = [];
            localStorage.setItem('adidasCart', JSON.stringify(cart));
            updateCartUI();
        }
    });

    document.getElementById('go-checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }
        window.location.href = 'finalizar.html';
    });

    updateCartUI();
});

const btnTopo = document.getElementById('btn-topo');

if (btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTopo.classList.add('visivel');
        } else {
            btnTopo.classList.remove('visivel');
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}