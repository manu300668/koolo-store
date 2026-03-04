// ==============================
// 🔥 CONFIGURACIÓN FIREBASE
// ==============================

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ==============================
// 🔐 CONTROL ADMIN
// ==============================

const ADMIN_EMAIL = "eumanu@msn.com";
const adminBtn = document.getElementById("adminBtn");

// Ocultamos por defecto
if (adminBtn) adminBtn.style.display = "none";

auth.onAuthStateChanged(user => {
  if (user && user.email === ADMIN_EMAIL) {
    adminBtn.style.display = "block";
  } else {
    adminBtn.style.display = "none";
  }
});

// ==============================
// 🍔 MENÚ HAMBURGUESA
// ==============================

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// ==============================
// 🛒 CARRITO SIMPLE
// ==============================

let cart = [];
const cartCount = document.getElementById("cartCount");

function updateCart() {
  cartCount.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

updateCart();
