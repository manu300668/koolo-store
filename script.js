//////////////////////////////
// 🔥 CONFIGURACIÓN FIREBASE
//////////////////////////////

const firebaseConfig = {
  apiKey: "AQUI_VA_TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//////////////////////////////
// 🛒 CARRITO
//////////////////////////////

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const cartCount = document.getElementById("cartCount");
  if(cartCount){
    cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
  }
}

//////////////////////////////
// ➕ AÑADIR AL CARRITO
//////////////////////////////

function addToCart(id,name,price){
  db.collection("products").doc(id).get().then(doc=>{
    if(!doc.exists) return;

    const stock = doc.data().stock;
    let existing = cart.find(item=>item.id===id);

    if(existing){
      if(existing.quantity + 1 > stock){
        alert("No hay suficiente stock disponible ⚠️");
        return;
      }
      existing.quantity++;
    } else {
      if(stock <= 0){
        alert("Producto agotado ❌");
        return;
      }
      cart.push({ id,name,price,quantity:1 });
    }
    saveCart();
    alert("Producto añadido al carrito 🛒");
  });
}

//////////////////////////////
// 🛍 MOSTRAR PRODUCTOS CON ANIMACIÓN
//////////////////////////////

function loadProducts(){
  db.collection("products").orderBy("createdAt","desc")
    .onSnapshot(snapshot=>{
      const list = document.getElementById("productsList");
      if(!list) return;
      list.innerHTML="";

      snapshot.forEach(doc=>{
        const p = doc.data();
        const outStock = p.stock <= 0;
        const lowStock = p.stock > 0 && p.stock <= 5;

        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.innerHTML = `
          ${outStock?'<div class="badge red">Agotado</div>':''}
          ${lowStock?'<div class="badge orange">Stock Bajo</div>':''}
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.price} €</p>
          <p>Stock: ${p.stock}</p>
          <button ${outStock?'disabled':''} onclick="addToCart('${doc.id}','${p.name}',${p.price})">
            ${outStock?'Agotado':'Añadir al carrito'}
          </button>
        `;
        list.appendChild(card);
      });

      // Agrega efecto fade-in
      const cards = document.querySelectorAll(".product-card");
      cards.forEach((c,i)=>{
        c.style.animation = `fadeIn 0.6s ease forwards`;
        c.style.animationDelay = `${i*0.1}s`;
      });
  });
}

//////////////////////////////
// 🍔 MENÚ HAMBURGUESA
//////////////////////////////

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-right");

if(hamburger){
  hamburger.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
  });
}

//////////////////////////////
// 🌟 HERO PARALLAX
//////////////////////////////

const hero = document.querySelector(".hero");
window.addEventListener("scroll",()=>{
  if(hero){
    const offset = window.scrollY * 0.4;
    hero.style.backgroundPosition = `center ${-offset}px`;
  }
});

//////////////////////////////
// 🔄 INICIAR
//////////////////////////////

loadProducts();
updateCartCount();
