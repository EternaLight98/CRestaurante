// Variables globales
let cart = [];
let isModalOpen = false;

// Datos de los platos para el modal
const dishData = {
    'ensalada-cesar': {
        name: 'Ensalada César Gourmet',
        price: 15000,
        image: 'ensalada_cesar.png',
        description: 'Nuestra ensalada César es una experiencia gourmet única. Preparada con lechuga romana fresca, crujientes, pollo a la parrilla marinado en hierbas aromáticas y nuestro aderezo especial de la casa elaborado con anchoas, parmesano añejado 24 meses y aceite de oliva extra virgen.',
        ingredients: ['Lechuga romana fresca', 'Pollo a la parrilla', 'Parmesano añejado', 'Aderezo especial', 'Crutones artesanales', 'Aceite de oliva extra virgen'],
        allergens: ['Gluten', 'Lácteos', 'Pescado (anchoas)'],
        calories: 280,
        time: '15 min'
    },
    'lomo-pimienta': {
        name: 'Lomo a la Pimienta Premium',
        price: 32000,
        image: 'lomo_pimienta.png',
        description: 'Corte premium de lomo de res, sellado a la perfección y bañado en nuestra exquisita salsa de pimienta verde. Acompañado de papas al horno con romero y tomillo, que complementan perfectamente los sabores intensos de este plato estrella.',
        ingredients: ['Lomo de res premium', 'Salsa de pimienta verde', 'Papas al horno', 'Romero fresco', 'Tomillo', 'Mantequilla de hierbas'],
        allergens: ['Lácteos'],
        calories: 450,
        time: '25 min'
    },
    'flan': {
        name: 'Flan de Caramelo Casero',
        price: 10000,
        image: 'flan_caramelo.png',
        description: 'Nuestro flan casero es preparado diariamente siguiendo la receta tradicional de la abuela. Con caramelo natural hecho en casa y crema batida fresca, es el final perfecto para cualquier comida especial.',
        ingredients: ['Huevos frescos', 'Leche entera', 'Caramelo natural', 'Crema batida', 'Vainilla natural', 'Azúcar'],
        allergens: ['Huevos', 'Lácteos'],
        calories: 320,
        time: '5 min'
    },
    'limonada-coco': {
        name: 'Limonada de Coco Tropical',
        price: 8000,
        image: 'limonada_coco.png',
        description: 'Bebida refrescante y tropical que combina el sabor cítrico del limón natural con la suavidad cremosa del coco. Servida bien fría con hielo y decorada con menta fresca para una experiencia verdaderamente refrescante.',
        ingredients: ['Limón natural', 'Crema de coco', 'Menta fresca', 'Hielo', 'Azúcar natural', 'Agua filtrada'],
        allergens: ['Coco'],
        calories: 150,
        time: '3 min'
    }
};

// Función para desplazamiento suave
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para mostrar detalles en modal
function showDetails(dishId) {
    const dish = dishData[dishId];
    if (!dish) return;

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="modal-dish-details">
            <div class="modal-dish-image">
                <img src="${dish.image}" alt="${dish.name}" onerror="this.style.display='none';">
            </div>
            <div class="modal-dish-info">
                <h2>${dish.name}</h2>
                <div class="dish-meta">
                    <span class="dish-price">$${dish.price.toLocaleString()}</span>
                    <span class="dish-time"><i class="fas fa-clock"></i> ${dish.time}</span>
                    <span class="dish-calories"><i class="fas fa-fire"></i> ${dish.calories} cal</span>
                </div>
                <p class="dish-description">${dish.description}</p>

                <div class="dish-ingredients">
                    <h4><i class="fas fa-list"></i> Ingredientes:</h4>
                    <ul>
                        ${dish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>

                <div class="dish-allergens">
                    <h4><i class="fas fa-exclamation-triangle"></i> Alérgenos:</h4>
                    <div class="allergen-tags">
                        ${dish.allergens.map(allergen => `<span class="allergen-tag">${allergen}</span>`).join('')}
                    </div>
                </div>

                <div class="modal-actions">
                    <div class="quantity-selector">
                        <button onclick="changeQuantity(-1)">-</button>
                        <span id="quantity">1</span>
                        <button onclick="changeQuantity(1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${dishId}')">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal').style.display = 'block';
    isModalOpen = true;
    document.body.style.overflow = 'hidden';

    // Agregar estilos CSS para el modal si no existen
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-dish-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                align-items: start;
            }

            .modal-dish-image img {
                width: 100%;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }

            .modal-dish-info h2 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-family: 'Playfair Display', serif;
            }

            .dish-meta {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .dish-meta span {
                background: #f8f9fa;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }

            .dish-price {
                background: var(--gradient-primary) !important;
                color: white !important;
                font-weight: bold;
            }

            .dish-description {
                margin-bottom: 1.5rem;
                line-height: 1.6;
                color: #666;
            }

            .dish-ingredients, .dish-allergens {
                margin-bottom: 1.5rem;
            }

            .dish-ingredients h4, .dish-allergens h4 {
                color: var(--text-dark);
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .dish-ingredients ul {
                list-style: none;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 0.5rem;
            }

            .dish-ingredients li {
                background: #e8f5e8;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.85rem;
            }

            .allergen-tags {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }

            .allergen-tag {
                background: #fff3cd;
                color: #856404;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.85rem;
                border: 1px solid #ffeaa7;
            }

            .modal-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 2rem;
                gap: 1rem;
            }

            .quantity-selector {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: #f8f9fa;
                padding: 0.5rem;
                border-radius: 25px;
            }

            .quantity-selector button {
                width: 35px;
                height: 35px;
                border: none;
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .quantity-selector button:hover {
                background: var(--secondary-color);
                transform: scale(1.1);
            }

            .quantity-selector span {
                font-weight: bold;
                font-size: 1.1rem;
                min-width: 30px;
                text-align: center;
            }

            .add-to-cart-btn {
                background: var(--gradient-primary);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .add-to-cart-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(183, 28, 28, 0.3);
            }

            @media (max-width: 768px) {
                .modal-dish-details {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .modal-actions {
                    flex-direction: column;
                    gap: 1rem;
                }

                .add-to-cart-btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// Función para cerrar modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    isModalOpen = false;
    document.body.style.overflow = 'auto';
}

// Función para cambiar cantidad
function changeQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity = Math.max(1, currentQuantity + change);
    quantityElement.textContent = currentQuantity;
}

// Función para agregar al carrito
function addToCart(dishId) {
    const dish = dishData[dishId];
    const quantity = parseInt(document.getElementById('quantity').textContent);

    // Buscar si el plato ya está en el carrito
    const existingItem = cart.find(item => item.id === dishId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: dishId,
            name: dish.name,
            price: dish.price,
            quantity: quantity,
            image: dish.image
        });
    }

    updateCartCount();
    closeModal();
    showCartNotification(dish.name, quantity);
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Función para mostrar notificación del carrito
function showCartNotification(dishName, quantity) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>¡${quantity}x ${dishName} agregado al carrito!</span>
        </div>
    `;

    // Agregar estilos para la notificación
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .cart-notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: #27ae60;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 3000;
                animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }

    document.body.appendChild(notification);

    // Remover notificación después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Función para alternar carrito
function toggleCart() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. ¡Agrega algunos platos deliciosos!');
        return;
    }

    // Crear modal del carrito
    const cartModal = document.createElement('div');
    cartModal.className = 'modal';
    cartModal.id = 'cart-modal';

    const cartItems = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Cantidad: ${item.quantity}</p>
                <p class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeCartModal()">&times;</span>
            <div id="cart-modal-body">
                <h2><i class="fas fa-shopping-cart"></i> Tu Carrito</h2>
                <div class="cart-items">
                    ${cartItems}
                </div>
                <div class="cart-total">
                    <h3>Total: $${total.toLocaleString()}</h3>
                </div>
                <div class="cart-actions">
                    <button onclick="clearCart()" class="clear-cart-btn">
                        <i class="fas fa-trash-alt"></i> Vaciar Carrito
                    </button>
                    <button onclick="checkout()" class="checkout-btn">
                        <i class="fas fa-credit-card"></i> Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    `;

    // Agregar estilos para el carrito si no existen
    if (!document.getElementById('cart-styles')) {
        const cartStyles = document.createElement('style');
        cartStyles.id = 'cart-styles';
        cartStyles.textContent = `
            .cart-items {
                max-height: 400px;
                overflow-y: auto;
                margin: 1rem 0;
            }

            .cart-item {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid #eee;
                gap: 1rem;
            }

            .cart-item img {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 8px;
            }

            .cart-item-info {
                flex: 1;
            }

            .cart-item-info h4 {
                margin-bottom: 0.5rem;
                color: var(--text-dark);
            }

            .cart-item-price {
                font-weight: bold;
                color: var(--primary-color);
            }

            .remove-btn {
                background: #e74c3c;
                color: white;
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .remove-btn:hover {
                background: #c0392b;
                transform: scale(1.1);
            }

            .cart-total {
                text-align: center;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 10px;
                margin: 1rem 0;
            }

            .cart-total h3 {
                color: var(--primary-color);
                font-family: 'Playfair Display', serif;
            }

            .cart-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            .clear-cart-btn, .checkout-btn {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .clear-cart-btn {
                background: #6c757d;
                color: white;
            }

            .clear-cart-btn:hover {
                background: #5a6268;
            }

            .checkout-btn {
                background: var(--gradient-primary);
                color: white;
            }

            .checkout-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(183, 28, 28, 0.3);
            }
        `;
        document.head.appendChild(cartStyles);
    }

    document.body.appendChild(cartModal);
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar modal del carrito
function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función para remover del carrito
function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    updateCartCount();
    closeCartModal();

    if (cart.length > 0) {
        toggleCart();
    }
}

// Función para vaciar carrito
function clearCart() {
    cart = [];
    updateCartCount();
    closeCartModal();
    alert('Carrito vaciado correctamente');
}

// Función para proceder al pago
function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`¡Gracias por tu pedido!\n\nTotal: $${total.toLocaleString()}\n\nEn breve nos pondremos en contacto contigo para confirmar tu orden.`);
    clearCart();
}

// Funciones de inicialización
function initScrollAnimations() {
    const sections = document.querySelectorAll('.menu-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScrolling();
    updateCartCount();

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isModalOpen) {
                closeModal();
            }
            closeCartModal();
        }
    });

    // Cerrar modal clickeando fuera
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        const cartModal = document.getElementById('cart-modal');

        if (e.target === modal) {
            closeModal();
        }
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // Efecto de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Funciones adicionales para mejorar la experiencia
function addLoadingStates() {
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) .menu-section {
            opacity: 0;
            transform: translateY(30px);
        }

        body.loaded .menu-section {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease;
        }

        .loading {
            pointer-events: none;
            opacity: 0.7;
        }

        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar estados de carga
addLoadingStates();

console.log('🍽️ Restaurante La Sazón - Sistema cargado correctamente');