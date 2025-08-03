// Variables globales
let isModalOpen = false;

// Datos expandidos de los platos para el modal
const dishData = {
  //Especialidades//
  bacalao: {
    name: "Bacalao",
    image: "./img/bacalao.jpg",
    description:
      "Delicioso bacalao en salsa de coco con tomate y arroz blanco.",
    ingredients: ["Bacalao", "langostinos", "Salsa de Coco", "Arroz Blanco"],
    /*pairings: ["Vino blanco seco", "Agua con gas", "Cerveza artesanal"],*/
  },

  //Ensaladas//
  "ensalada-cuscus": {
    name: "Ensalada de Cuscús",
    image: "./img/ensalada_cuscus.jpg",
    description:
      "Ligera ensalada de cuscús con verduras de temporada, dátiles y una vinagreta de limón.",
    ingredients: [
      "Cuscús espojoso",
      "Cebolla y tomate",
      "Aguacate",
      "Rabanos y dátiles",
      "Salsa de la casa",
    ],
  },

  // Para Compartir//

  "nachos": {
    name: "Nachos de la Casa",
    price: 24000,
    image: "./img/nachos.jpg",
    description:
      "nachos con queso cheddar, carne picada, alubias, jalapeños, salsas y picadito de verduras.",
    ingredients: [
        "Nachos",
      "Queso cheddar",
      "Carne mexicana",
      "Queso mozarrella",
      "Jalapeños",
      "Salsa de la casa",
    ],
  },

  //Zumos 100% Naturales//
  "ice-cafe": {
    name: "Ice Cafe",
    image: "./img/ice_cafe.jpg",
    description:
      "Un refrescante cafe granizado con una bola de helado para dar un toque mas frio.",
    ingredients: [
      "Cafe espresso",
      "Hielo triturado",
      "Helado de vainilla",
    ],
  },
};

// Función para desplazamiento suave (mantenida para compatibilidad)
function smoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Función para navegar a otra página
function goToPage(pageUrl) {
  window.location.href = pageUrl;
}

// Función para mostrar detalles en modal con scroll
function showDetails(dishId) {
  const dish = dishData[dishId];
  if (!dish) return;

  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
        <div class="modal-dish-details">
            <div class="modal-header-section">
                <div class="modal-dish-image">
                    <img src="${dish.image}" alt="${
    dish.name
  }" onerror="this.style.display='none';">
                    
                </div>
                <div class="modal-dish-title">
                    <h2>${dish.name}</h2>
                </div>
            </div>

            <div class="modal-content-sections">
                <div class="dish-description-section">
                    <h3><i class="fas fa-info-circle"></i> Descripción</h3>
                    <p class="dish-description">${dish.description}</p>
                </div>

                <div class="dish-ingredients-section">
                    <h3><i class="fas fa-list"></i> Ingredientes Principales</h3>
                    <div class="ingredients-grid">
                        ${dish.ingredients
                          .map(
                            (ingredient) =>
                              `<span class="ingredient-tag">${ingredient}</span>`
                          )
                          .join("")}
                    </div>
                </div>

                <div class="modal-footer-actions">
                    <button class="contact-btn" onclick="contactRestaurant('${
                      dish.name
                    }')">
                        <i class="fas fa-phone"></i> Reservar Mesa
                    </button>
                </div>
            </div>
        </div>
    `;

  document.getElementById("modal").style.display = "block";
  isModalOpen = true;
  document.body.style.overflow = "hidden";

  // Scroll al inicio del modal
  modalBody.scrollTop = 0;

  // Agregar estilos CSS para el modal scrollable si no existen
  if (!document.getElementById("modal-styles")) {
    const modalStyles = document.createElement("style");
    modalStyles.id = "modal-styles";
    modalStyles.textContent = `
            .scrollable-modal {
                max-height: 90vh;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .modal-body-scroll {
                max-height: calc(90vh - 4rem);
                overflow-y: auto;
                overflow-x: hidden;
                padding-right: 10px;
            }

            .modal-dish-details {
                display: block;
                width: 100%;
            }

            .modal-header-section {
                display: grid;
                grid-template-columns: 1fr 1.5fr;
                gap: 2rem;
                align-items: start;
                margin-bottom: 2rem;
                padding-bottom: 2rem;
                border-bottom: 2px solid #eee;
            }

            .modal-dish-image {
                position: relative;
            }

            .modal-dish-image img {
                width: 100%;
                height: 350px;
                justify-self: center;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                gap: 1rem;
                border-radius: 12px;
                object-fit: cover;
            }

            .modal-price-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #2c3e50;
                padding: 0.8rem 1.2rem;
                border-radius: 25px;
                font-size: 1.3rem;
                font-weight: bold;
                font-family: 'Playfair Display', serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }

            .modal-dish-title h2 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                line-height: 1.2;
                text-align: center;
            }

            .dish-rating {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }

            .dish-rating i {
                color: #FFD700;
                font-size: 1.2rem;
            }

            .rating-text {
                color: #666;
                font-weight: 600;
                margin-left: 0.5rem;
            }

            .modal-content-sections {
                display: block;
            }

            .dish-description-section, 
            .dish-ingredients-section, 
            .dish-preparation-section, 
            .chef-tips-section, 
            .pairings-section {
                margin-bottom: 2.5rem;
                padding: 1.5rem;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid var(--primary-color);
            }

            .modal-content-sections h3 {
                color: var(--primary-color);
                margin-bottom: 1.2rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                font-size: 1.3rem;
                font-weight: 600;
                font-family: 'Playfair Display', serif;
            }

            .dish-description {
                line-height: 1.8;
                color: #555;
                font-size: 1.05rem;
                text-align: justify;
            }

            .ingredients-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 1rem;
            }

            .ingredient-tag {
                background: linear-gradient(135deg, #e8f5e8, #d4edda);
                color: #2d5a2d;
                padding: 0.8rem 1.2rem;
                border-radius: 25px;
                font-size: 0.95rem;
                text-align: center;
                border: 2px solid #c3e6cb;
                font-weight: 500;
                transition: transform 0.2s ease;
            }

            .ingredient-tag:hover {
                transform: translateY(-2px);
            }

            .preparation-steps {
                list-style: none;
                counter-reset: step-counter;
                padding-left: 0;
            }

            .preparation-steps li {
                counter-increment: step-counter;
                margin-bottom: 1.2rem;
                padding: 1rem 1.5rem;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                padding-left: 4rem;
                line-height: 1.6;
            }

            .preparation-steps li::before {
                content: counter(step-counter);
                position: absolute;
                left: 1rem;
                top: 1rem;
                background: var(--primary-color);
                color: white;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 0.9rem;
            }

            .chef-tip {
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                border-left: 4px solid #FFD700;
                font-style: italic;
            }

            .chef-tip p {
                font-size: 1.1rem;
                line-height: 1.7;
                color: #444;
                margin-bottom: 1rem;
            }

            .chef-signature {
                display: block;
                text-align: right;
                color: var(--primary-color);
                font-weight: 600;
                font-size: 0.9rem;
            }

            .pairings-list {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .pairing-tag {
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                color: #856404;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-size: 0.95rem;
                border: 2px solid #ffd700;
                font-weight: 500;
                transition: transform 0.2s ease;
            }

            .pairing-tag:hover {
                transform: translateY(-2px);
            }

            .modal-footer-actions {
                display: flex;
                justify-content: space-between;
                gap: 1.5rem;
                margin-top: 3rem;
                padding-top: 2rem;
                border-top: 2px solid #eee;
            }

            .close-modal-btn, .contact-btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                flex: 1;
                justify-content: center;
            }

            .close-modal-btn {
                background: #6c757d;
                color: white;
            }

            .close-modal-btn:hover {
                background: #5a6268;
                transform: translateY(-2px);
            }

            .contact-btn {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
            }

            .contact-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 18px rgba(139, 69, 19, 0.4);
            }

            /* Scrollbar personalizada para el modal */
            .modal-body-scroll::-webkit-scrollbar {
                width: 8px;
            }

            .modal-body-scroll::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }

            .modal-body-scroll::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 4px;
            }

            .modal-body-scroll::-webkit-scrollbar-thumb:hover {
                background: var(--secondary-color);
            }

            @media (max-width: 768px) {
                .modal-header-section {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .modal-dish-title h2 {
                    font-size: 1.6rem;
                }

                .modal-footer-actions {
                    flex-direction: column;
                    gap: 1rem;
                }

                .close-modal-btn, .contact-btn {
                    width: 100%;
                    padding: 1.2rem 2rem;
                }

                .ingredients-grid {
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 0.8rem;
                }

                .pairings-list {
                    justify-content: center;
                }

                .modal-price-badge {
                    font-size: 1.1rem;
                    padding: 0.6rem 1rem;
                }
            }
        `;
    document.head.appendChild(modalStyles);
  }
}

// Función para cerrar modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
  isModalOpen = false;
  document.body.style.overflow = "auto";
}

// Función para contactar al restaurante
function contactRestaurant(dishName) {
  const phoneNumber = "+573158852282";
  const message = `Hola! Me interesa hacer una reserva y me gustaría más información sobre: ${dishName}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Cerrar modal con ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isModalOpen) {
      closeModal();
    }
  });

  // Cerrar modal clickeando fuera
  window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
      closeModal();
    }
  });

  // Efectos de carga suaves
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 300);
});

console.log(
  "🍹 La Cantina de Floor - Navegación por páginas cargada correctamente"
);
