// 🔹 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const ADMIN_EMAIL = "eumanu@msn.com";
const adminBtn = document.getElementById("adminBtn");

// 🔹 ADMIN: mostrar botón solo si es admin
auth.onAuthStateChanged(user => {
  if(user && user.email === ADMIN_EMAIL){
    adminBtn.style.display = "inline";
  } else {
    adminBtn.style.display = "none";
  }
});

// 🔹 CARGAR PRODUCTOS DESDE FIRESTORE
db.collection("products").onSnapshot(snapshot => {
  const container = document.getElementById("products");
  container.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    container.innerHTML += `
      <div class="product-card">
        <img src="${data.image}" alt="${data.name}">
        <h3>${data.name}</h3>
        <p>${data.price} €</p>
        <button onclick="addToCart('${data.name}', ${data.price})">
          Añadir al carrito
        </button>
      </div>
    `;
  });
});

// 🔹 CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){ 
  localStorage.setItem("cart", JSON.stringify(cart)); 
}

function updateCart(){
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        ${item.name} - ${item.price} €
        <br>
        <button onclick="removeFromCart(${index})">Eliminar</button>
      </div>
    `;
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = total.toFixed(2);
  saveCart();
}

function addToCart(name, price){
  cart.push({name, price});
  updateCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

function clearCart(){
  cart = [];
  updateCart();
}

function toggleCart(){
  document.getElementById("cartPanel").classList.toggle("active");
}

// 🔹 FINALIZAR COMPRA
function goToCheckout(){
  if(cart.length === 0){
    alert("Tu carrito está vacío");
    return;
  }
  localStorage.setItem("checkoutCart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

// Inicializar carrito al cargar
updateCart();
