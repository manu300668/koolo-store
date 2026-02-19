document.addEventListener("DOMContentLoaded", function(){

/* =========================
   VARIABLES GENERALES
========================= */

const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addButtons = document.querySelectorAll(".add-to-cart");
const loginModal = document.getElementById("login-modal");
const adminBtn = document.getElementById("admin-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   CARRITO
========================= */

function updateCart(){
  cartItems.innerHTML="";
  let total=0;

  cart.forEach((item,index)=>{
    total+=item.price;

    const li=document.createElement("li");
    li.innerHTML=`
      ${item.name} - ${item.price}€
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent=cart.length;
  cartTotal.textContent="Total: "+total+"€";

  localStorage.setItem("cart",JSON.stringify(cart));
}

window.removeItem=function(index){
  cart.splice(index,1);
  updateCart();
}

addButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const product=btn.parentElement;
    const name=product.querySelector("h3").textContent;
    const price=parseInt(product.querySelector("p").textContent);
    cart.push({name,price});
    updateCart();
  });
});

document.querySelector(".cart").addEventListener("click",()=>{
  cartDropdown.style.display =
  cartDropdown.style.display==="block" ? "none" : "block";
});

updateCart();

/* =========================
   BOTONES NAVEGACIÓN
========================= */

document.getElementById("btn-inicio").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("btn-categorias").addEventListener("click", () => {
  document.querySelector("main").scrollIntoView({ behavior: "smooth" });
});

/* =========================
   LOGIN
========================= */

document.getElementById("btn-login").onclick = () => {
  loginModal.style.display = "block";
};

document.getElementById("close-modal").onclick = () => {
  loginModal.style.display = "none";
};

document.getElementById("register-form")
.addEventListener("submit",e=>{
  e.preventDefault();

  const user={
    username: regUsername.value,
    email: regEmail.value,
    password: regPassword.value,
    address: regAddress.value
  };

  localStorage.setItem("user",JSON.stringify(user));
  alert("Registrado correctamente");
});

document.getElementById("login-form")
.addEventListener("submit",e=>{
  e.preventDefault();

  const email=loginEmail.value;
  const password=loginPassword.value;
  const user=JSON.parse(localStorage.getItem("user"));

  if(user && user.email===email && user.password===password){

    alert("Bienvenido "+user.username);
    loginModal.style.display="none";

    // ADMIN SOLO PARA TU EMAIL
    if(email==="TUEMAIL@DOMINIO.COM"){
      adminBtn.style.display="block";
    } else {
      adminBtn.style.display="none";
    }

  }else{
    alert("Datos incorrectos");
  }
});

/* =========================
   ADMIN PANEL
========================= */

const adminPanel=document.getElementById("admin-panel");

adminBtn.onclick=()=>{
  adminPanel.style.display="block";
};

document.getElementById("close-admin").onclick=()=>{
  adminPanel.style.display="none";
};

/* =========================
   MENÚ HAMBURGUESA
========================= */

const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  sideMenu.style.left = "0";
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.left = "-250px";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sideMenu.style.left = "-250px";
  overlay.style.display = "none";
});

/* =========================
   REDES SOCIALES DINÁMICAS
========================= */

function loadSocials(){
  const socials=JSON.parse(localStorage.getItem("socials"))||[];
  const footer=document.getElementById("footer");
  footer.innerHTML="";

  socials.forEach(s=>{
    const a=document.createElement("a");
    a.href=s.url;
    a.target="_blank";
    a.textContent=s.name;
    footer.appendChild(a);
  });
}

document.getElementById("add-social-btn")
.addEventListener("click",()=>{
  const name=document.getElementById("social-name").value;
  const url=document.getElementById("social-url").value;

  let socials=JSON.parse(localStorage.getItem("socials"))||[];
  socials.push({name,url});
  localStorage.setItem("socials",JSON.stringify(socials));

  loadSocials();
});

loadSocials();

});
