/* ===============================
   🔥 FIREBASE CONFIG
================================ */

const firebaseConfig = {
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* ===============================
   🔐 CONTROL ADMIN
================================ */

auth.onAuthStateChanged(user => {

  const adminBtn = document.getElementById("adminBtn");

  if (user && user.email === "eumanu@msn.com") {
    adminBtn.style.display = "block";
  } else {
    adminBtn.style.display = "none";
  }

});

/* ===============================
   🍔 MENÚ HAMBURGUESA
================================ */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
});

/* ===============================
   🛒 CARRITO
================================ */

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

cartIcon.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
  overlay.classList.toggle("active");
});

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - €${item.price}</p>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;

    cartItemsContainer.appendChild(div);

  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

/* ===============================
   💳 CHECKOUT SIMULADO
================================ */

function checkout() {

  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  alert("Simulación de pago completada ✔");
  cart = [];
  updateCart();
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");

}

/* ===============================
   🛍 PRODUCTOS DEMO
================================ */

const productsList = document.getElementById("productsList");

const products = [
  { name: "Sudadera Negra", price: 59, image: "img/product1.jpg" },
  { name: "Camiseta Blanca", price: 35, image: "img/product2.jpg" }
];

products.forEach(product => {

  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>€${product.price}</p>
    <button onclick="addToCart('${product.name}', ${product.price})">
      Añadir al carrito
    </button>
  `;

  productsList.appendChild(card);

});
