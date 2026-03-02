// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AQUI_TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

/* ================= HAMBURGUESA ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", ()=>{
  navMenu.classList.toggle("active");
});

/* ================= CARRITO ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount(){
  const cartCount = document.getElementById("cartCount");
  if(cartCount){
    cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
  }
}

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id,name,price){
  let existing = cart.find(item=>item.id===id);
  if(existing){
    existing.quantity++;
  }else{
    cart.push({id,name,price,quantity:1});
  }
  saveCart();
}

updateCartCount();

/* ================= CATEGORÍAS ================= */
const categoriesMenu = document.getElementById("categoriesMenu");
let selectedCategory = "all";

function loadCategories(){
  db.collection("categories").orderBy("order").onSnapshot(snapshot=>{
    categoriesMenu.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.innerText = "Todas";
    allBtn.onclick = ()=>{
      selectedCategory="all";
      loadProducts();
    };
    categoriesMenu.appendChild(allBtn);

    snapshot.forEach(doc=>{
      const c = doc.data();
      const btn = document.createElement("button");
      btn.innerText = c.name;
      btn.onclick = ()=>{
        selectedCategory = c.name;
        loadProducts();
      };
      categoriesMenu.appendChild(btn);
    });
  });
}

/* ================= PRODUCTOS ================= */
function loadProducts(){
  let query = db.collection("products");

  if(selectedCategory !== "all"){
    query = query.where("category","==",selectedCategory);
  }

  query.onSnapshot(snapshot=>{
    const container = document.getElementById("productsList");
    container.innerHTML = "";

    snapshot.forEach(doc=>{
      const p = doc.data();

      const card = document.createElement("div");
      card.className="product-card";
      card.innerHTML = `
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} €</p>
        <button onclick="addToCart('${doc.id}','${p.name}',${p.price})">
          Añadir al carrito
        </button>
      `;
      container.appendChild(card);
    });
  });
}

/* ================= ADMIN VISIBILIDAD ================= */
auth.onAuthStateChanged(user=>{
  const adminBtn = document.querySelector(".admin-btn");
  const logoutBtn = document.getElementById("logoutBtn");

  if(user){
    adminBtn.style.display="inline-block";
    logoutBtn.style.display="inline-block";
  }else{
    adminBtn.style.display="none";
    logoutBtn.style.display="none";
  }
});

document.getElementById("logoutBtn").addEventListener("click",()=>{
  auth.signOut();
});

/* ================= INIT ================= */
loadCategories();
loadProducts();
