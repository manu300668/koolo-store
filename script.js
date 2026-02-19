const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addButtons = document.querySelectorAll(".add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

function removeItem(index){
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
  cartDropdown.style.display=
  cartDropdown.style.display==="block"?"none":"block";
});

updateCart();

/* LOGIN */

const loginModal=document.getElementById("login-modal");
const btnLogin=document.getElementById("btn-login");
const closeModal=document.getElementById("close-modal");
const adminBtn=document.getElementById("admin-btn");

btnLogin.onclick=()=>loginModal.style.display="block";
closeModal.onclick=()=>loginModal.style.display="none";

document.getElementById("register-form")
.addEventListener("submit",e=>{
  e.preventDefault();
  const user={
    username:regUsername.value,
    email:regEmail.value,
    password:regPassword.value,
    address:regAddress.value
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

    if(email==="TUEMAIL@DOMINIO.COM"){
      adminBtn.style.display="block";
    }
  }else{
    alert("Datos incorrectos");
  }
});

/* ADMIN PANEL */

const adminPanel=document.getElementById("admin-panel");
const closeAdmin=document.getElementById("close-admin");

adminBtn.onclick=()=>adminPanel.style.display="block";
closeAdmin.onclick=()=>adminPanel.style.display="none";

/* REDES SOCIALES */

const socialList=document.getElementById("social-list");

document.getElementById("add-social-btn")
.addEventListener("click",()=>{
  const name=document.getElementById("social-name").value;
  const url=document.getElementById("social-url").value;

  let socials=JSON.parse(localStorage.getItem("socials"))||[];
  socials.push({name,url});
  localStorage.setItem("socials",JSON.stringify(socials));
  loadSocials();
});

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

loadSocials();
