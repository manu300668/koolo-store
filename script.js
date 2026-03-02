// 🔥 CONFIG FIREBASE (TU CONFIG)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// 🍔 HAMBURGUESA
document.addEventListener("DOMContentLoaded", function(){

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", function(){
    navMenu.classList.toggle("active");
  });

});

// 🔒 CONTROL ADMIN
auth.onAuthStateChanged(user => {

  const adminBtn = document.getElementById("adminBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if(user){

    if(user.email === "eumanu@msn.com"){ // TU EMAIL ADMIN
      adminBtn.style.display="inline-block";
      logoutBtn.style.display="inline-block";

      adminBtn.onclick = function(){
        window.location.href="admin.html";
      }
    }

  } else {
    adminBtn.style.display="none";
    logoutBtn.style.display="none";
  }

});

// 🔓 LOGOUT
document.getElementById("logoutBtn").addEventListener("click", ()=>{
  auth.signOut();
  alert("Sesión cerrada");
});

// 🛒 CARRITO SIMPLE
let cart = [];

function addToCart(product){
  cart.push(product);
  document.getElementById("cartCount").innerText = cart.length;
}

// 🔥 CARGAR PRODUCTOS DESDE FIRESTORE
db.collection("products").onSnapshot(snapshot=>{
  const productsList = document.getElementById("productsList");
  productsList.innerHTML="";

  snapshot.forEach(doc=>{
    const product = doc.data();

    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price} €</p>
      <button onclick="addToCart('${product.name}')">Añadir</button>
    `;

    productsList.appendChild(div);
  });

});
