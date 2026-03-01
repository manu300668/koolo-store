//////////////////////////////
// 🔹 CONFIGURACIÓN FIREBASE
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
const auth = firebase.auth();

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
// 🏷️ CATEGORÍAS DINÁMICAS
//////////////////////////////

const categoriesMenu = document.getElementById("categoriesMenu");
let selectedCategory = "all";

function loadCategories(){
  db.collection("categories").orderBy("order").onSnapshot(snapshot=>{
    if(!categoriesMenu) return;
    categoriesMenu.innerHTML = "";

    // Botón Todas
    const allBtn = document.createElement("button");
    allBtn.innerText = "Todas";
    allBtn.className = selectedCategory==="all"?"active-category":"";
    allBtn.onclick = ()=>{ selectedCategory="all"; loadProducts(); loadCategories(); };
    categoriesMenu.appendChild(allBtn);

    snapshot.forEach(doc=>{
      const c = doc.data();
      const btn = document.createElement("button");
      btn.innerText = c.name;
      btn.className = selectedCategory===c.name?"active-category":"";
      btn.onclick = ()=>{
        selectedCategory = c.name;
        loadProducts();
        loadCategories();
      };
      categoriesMenu.appendChild(btn);
    });
  });
}

//////////////////////////////
// 🛍 MOSTRAR PRODUCTOS CON FILTRO Y ANIMACIÓN
//////////////////////////////

function loadProducts(){
  let query = db.collection("products").orderBy("createdAt","desc");
  if(selectedCategory !== "all"){
    query = query.where("category","==",selectedCategory);
  }

  query.onSnapshot(snapshot=>{
    const list = document.getElementById("productsList");
    if(!list) return;
    list.innerHTML="";

    snapshot.forEach((doc,i)=>{
      const p = doc.data();
      const outStock = p.stock <= 0;
      const lowStock = p.stock > 0 && p.stock <= 5;

      const card = document.createElement("div");
      card.className = "product-card fade-slide";
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
      card.style.animationDelay = `${i*0.1}s`;
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
// 🌟 HERO PARALLAX SUAVE
//////////////////////////////

const hero = document.querySelector(".hero");
window.addEventListener("scroll",()=>{
  if(hero){
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPosition = `center ${-offset}px`;
  }
});

//////////////////////////////
// 🔹 ADMIN VISIBILIDAD BOTÓN
//////////////////////////////

auth.onAuthStateChanged(user=>{
  const adminBtn = document.querySelector(".admin-btn");
  if(adminBtn){
    if(user){
      adminBtn.style.display="inline-block";
    } else {
      adminBtn.style.display="none";
    }
  }
});

//////////////////////////////
// 🔄 INICIAR
//////////////////////////////

loadCategories();
loadProducts();
updateCartCount();
