document.addEventListener("DOMContentLoaded", function(){

/* ================= VARIABLES ================= */

const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addButtons = document.querySelectorAll(".add-to-cart");

const loginModal = document.getElementById("login-modal");
const adminBtn = document.getElementById("admin-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CARRITO ================= */

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
};

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

/* ================= NAVEGACIÓN ================= */

document.getElementById("inicio-btn").addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"});
});

document.getElementById("categorias-btn").addEventListener("click",()=>{
    document.querySelector("main").scrollIntoView({behavior:"smooth"});
});

document.getElementById("login-btn").addEventListener("click",()=>{
    loginModal.style.display="block";
});

/* ===== MENU LATERAL ===== */

document.getElementById("inicio-side").addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"});
});

document.getElementById("categorias-side").addEventListener("click",()=>{
    document.querySelector("main").scrollIntoView({behavior:"smooth"});
});

document.getElementById("login-side").addEventListener("click",()=>{
    loginModal.style.display="block";
});

/* ================= LOGIN ================= */

document.getElementById("close-modal").onclick=()=>{
    loginModal.style.display="none";
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

        if(email==="TUEMAIL@DOMINIO.COM"){
            adminBtn.style.display="inline-block";
        } else {
            adminBtn.style.display="none";
        }

    }else{
        alert("Datos incorrectos");
    }
});

/* ================= MENU HAMBURGUESA ================= */

const hamburger=document.getElementById("hamburger");
const sideMenu=document.getElementById("side-menu");
const closeBtn=document.getElementById("close-btn");
const overlay=document.getElementById("overlay");

hamburger.addEventListener("click",()=>{
    sideMenu.style.left="0";
    overlay.style.display="block";
});

closeBtn.addEventListener("click",()=>{
    sideMenu.style.left="-250px";
    overlay.style.display="none";
});

overlay.addEventListener("click",()=>{
    sideMenu.style.left="-250px";
    overlay.style.display="none";
});

});
