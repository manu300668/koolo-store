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

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");
const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");

hamburger.addEventListener("click", ()=>{
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.style.display="block";
});

overlay.addEventListener("click", ()=>{
  navMenu.classList.remove("active");
  cartPanel.classList.remove("active");
  hamburger.classList.remove("active");
  overlay.style.display="none";
});

cartIcon.addEventListener("click", ()=>{
  cartPanel.classList.toggle("active");
  overlay.style.display="block";
});

auth.onAuthStateChanged(user=>{
  const adminBtn = document.getElementById("adminBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if(user && user.email==="eumanu@msn.com"){
    adminBtn.style.display="inline-block";
    logoutBtn.style.display="inline-block";
    adminBtn.onclick=()=>window.location="admin.html";
  }else{
    adminBtn.style.display="none";
    logoutBtn.style.display="none";
  }
});

document.getElementById("logoutBtn").addEventListener("click",()=>{
  auth.signOut();
});

let cart=[];

function addToCart(name,price){
  cart.push({name,price});
  updateCart();
}

function updateCart(){
  const cartItems=document.getElementById("cartItems");
  const cartCount=document.getElementById("cartCount");
  const cartTotal=document.getElementById("cartTotal");

  cartItems.innerHTML="";
  let total=0;

  cart.forEach(item=>{
    total+=item.price;
    cartItems.innerHTML+=`<p>${item.name} - ${item.price}€</p>`;
  });

  cartCount.innerText=cart.length;
  cartTotal.innerText=total;
}

db.collection("products").onSnapshot(snapshot=>{
  const list=document.getElementById("productsList");
  list.innerHTML="";

  snapshot.forEach(doc=>{
    const p=doc.data();
    list.innerHTML+=`
      <div class="product">
        <img src="${p.image}" alt="">
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.price} €</p>
          <button onclick="addToCart('${p.name}',${p.price})">
            Añadir al carrito
          </button>
        </div>
      </div>
    `;
  });
});
