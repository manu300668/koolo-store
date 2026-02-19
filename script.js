// VARIABLES
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");
const overlay = document.getElementById("overlay");

const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsList = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartTotalDisplay = document.getElementById("cart-total");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const adminBtn = document.getElementById("admin-btn");

const checkoutBtn = document.getElementById("checkout-btn");
const userAddressDisplay = document.getElementById("user-address");

// CARRITO PERSISTENTE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// MENÚ LATERAL
hamburger.addEventListener("click",()=>{
  sideMenu.style.left="0"; overlay.style.opacity="1"; overlay.style.visibility="visible";
});
function closeMenu(){ sideMenu.style.left="-280px"; overlay.style.opacity="0"; overlay.style.visibility="hidden"; }
closeBtn.addEventListener("click",closeMenu);
overlay.addEventListener("click",closeMenu);

// ACTUALIZAR MINI CARRITO
function updateCartDisplay(){
  const totalQty = cart.reduce((sum,p)=>sum+p.qty,0);
  cartCount.textContent=totalQty;
  cartCount.style.transform="scale(1.5)";
  setTimeout(()=>{cartCount.style.transform="scale(1)";},300);

  cartItemsList.innerHTML="";
  let total=0;
  cart.forEach((p,index)=>{
    const li=document.createElement("li");
    li.innerHTML=`<img src="img/${p.img}" alt="${p.name}"><span>${p.name} (${p.qty}) - ${p.price}€</span><button class="remove-btn" data-index="${index}">❌</button>`;
    cartItemsList.appendChild(li);
    total+=p.qty*p.price;
  });
  cartTotalDisplay.textContent=`Total: ${total}€`;

  document.querySelectorAll(".remove-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const idx=parseInt(btn.getAttribute("data-index"));
      cart.splice(idx,1);
      localStorage.setItem("cart",JSON.stringify(cart));
      updateCartDisplay();
    });
  });
}

// AÑADIR PRODUCTO
addButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const productDiv = btn.parentElement;
    const name = productDiv.querySelector("h3").textContent;
    const priceText = productDiv.querySelector("p").textContent;
    const price = parseFloat(priceText.replace("€",""));
    const imgSrc = productDiv.querySelector("img").getAttribute("src").replace("img/","");

    const existing = cart.find(p=>p.name===name);
    if(existing){ existing.qty+=1; }
    else{ cart.push({name,price,qty:1,img:imgSrc}); }

    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartDisplay();
    cartDropdown.style.display="block";
    setTimeout(()=>{cartDropdown.style.display="none";},2000);
  });
});

const cartElement = document.querySelector(".cart");
cartElement.addEventListener("mouseenter",()=>cartDropdown.style.display="block");
cartElement.addEventListener("mouseleave",()=>cartDropdown.style.display="none");

clearCartBtn.addEventListener("click",()=>{ cart=[]; localStorage.setItem("cart",JSON.stringify(cart)); updateCartDisplay(); });

// REGISTRO
registerForm.addEventListener("submit",e=>{
  e.preventDefault();
  const username=document.getElementById("reg-username").value.trim();
  const email=document.getElementById("reg-email").value.trim();
  const password=document.getElementById("reg-password").value.trim();
  const address=document.getElementById("reg-address").value.trim();
  if(!username||!email||!password||!address){ alert("Completa todos los campos"); return; }
  const user={username,email,password,address};
  localStorage.setItem("user",JSON.stringify(user));
  alert("Usuario registrado con éxito!");
  registerForm.reset();
  updateUserAddress();
});

// LOGIN
loginForm.addEventListener("submit",e=>{
  e.preventDefault();
  const email=document.getElementById("login-email").value.trim();
  const password=document.getElementById("login-password").value.trim();
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){ alert("Usuario no registrado"); return; }
  if(user.email===email && user.password===password){
    alert(`Bienvenido ${user.username}!`);
    loginForm.reset();
    adminBtn.style.display=(email==="tuemail@dominio.com")?"block":"none";
    updateUserAddress();
  } else { alert("Email o contraseña incorrectos"); }
});

// CHECKOUT
function updateUserAddress(){
  const user=JSON.parse(localStorage.getItem("user"));
  userAddressDisplay.textContent=(user && user.address)?user.address:"No registrado";
}

checkoutBtn.addEventListener("click",()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){ alert("Regístrate o inicia sesión para finalizar la compra."); return; }
  if(cart.length===0){ alert("Tu carrito está vacío."); return; }

  let summary="Productos:\n";
  let total=0;
  cart.forEach(p=>{ summary+=`${p.name} (${p.qty}) - ${p.price}€ cada uno\n`; total+=p.qty*p.price; });
  summary+=`\nTotal: ${total}€\nEnviando a: ${user.address}`;
  alert(`Compra finalizada!\n${summary}`);

  cart=[]; localStorage.setItem("cart",JSON.stringify(cart)); updateCartDisplay();
});

// Inicializar
updateCartDisplay();
updateUserAddress();
