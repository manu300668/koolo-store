const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");
const cartCount = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-to-cart");

let count = 0;

// Abrir menú lateral
hamburger.addEventListener("click", () => {
  sideMenu.style.left = "0";
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
});

// Cerrar menú
function closeMenu() {
  sideMenu.style.left = "-280px";
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";
}

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Contador carrito animado
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    count++;
    cartCount.textContent = count;

    // Animación "salto" del círculo rojo
    cartCount.style.transform = "scale(1.5)";
    setTimeout(() => {
      cartCount.style.transform = "scale(1)";
    }, 300);
  });
});
