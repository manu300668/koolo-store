// FIREBASE
const firebaseConfig = {
apiKey:"TU_API_KEY",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.firebasestorage.app",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// MENU HAMBURGER
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navMenu");
hamburger.onclick = () => nav.classList.toggle("show");

// CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
cartIcon.onclick = () => cartPanel.classList.toggle("open");

// PRODUCTOS
let allProducts = [];
let filteredProducts = [];

function loadProducts(){
const container = document.getElementById("productsList");
db.collection("productos").get().then(snapshot=>{
allProducts=[];
snapshot.forEach(doc=>{
const p = doc.data();
p.id=doc.id;
allProducts.push(p);
});
filteredProducts = allProducts;
renderProducts();
});
}

function renderProducts(){
const container = document.getElementById("productsList");
container.innerHTML="";
filteredProducts.forEach(p=>{
container.innerHTML += `
<div class="product">
<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>€${p.precio}</p>
<button onclick="addToCart('${p.nombre}',${p.precio})">Añadir al carrito</button>
</div>
`;
});
}

function filterProducts(cat){
if(cat==="all"){filteredProducts = allProducts;}
else{filteredProducts = allProducts.filter(p=>p.categoria===cat);}
renderProducts();
}

document.getElementById("searchInput").addEventListener("input", function(){
const text = this.value.toLowerCase();
filteredProducts = allProducts.filter(p => p.nombre.toLowerCase().includes(text));
renderProducts();
});

// CARRITO FUNCIONES
function addToCart(nombre,precio){
const item = cart.find(p => p.nombre === nombre);
if(item){item.cantidad++;}
else{cart.push({nombre:nombre,precio:precio,cantidad:1});}
saveCart();
updateCart();
}

function saveCart(){localStorage.setItem("cart", JSON.stringify(cart));}

function removeItem(nombre){cart = cart.filter(p=>p.nombre!==nombre);saveCart();updateCart();}

function changeQty(nombre,delta){
const item = cart.find(p=>p.nombre===nombre);
item.cantidad+=delta;
if(item.cantidad<=0){removeItem(nombre);return;}
saveCart();
updateCart();
}

function updateCart(){
cartItems.innerHTML="";
let total=0; let count=0;
cart.forEach(item=>{
total+=item.precio*item.cantidad;
count+=item.cantidad;
cartItems.innerHTML+=`
<div class="cart-item">
<p>${item.nombre}</p>
<p>€${item.precio}</p>
<div class="qty">
<button onclick="changeQty('${item.nombre}',-1)">-</button>
<span>${item.cantidad}</span>
<button onclick="changeQty('${item.nombre}',1)">+</button>
</div>
<button onclick="removeItem('${item.nombre}')">❌</button>
</div>
`;
});
cartTotal.innerText = total;
cartCount.innerText = count;
renderPaypal(total);
}

updateCart();

// PAYPAL
function renderPaypal(total){
document.getElementById("paypal-button-container").innerHTML="";
if(total===0) return;
paypal.Buttons({
createOrder:function(data,actions){return actions.order.create({purchase_units:[{amount:{value:total.toString()}}]});},
onApprove:function(data,actions){
return actions.order.capture().then(details=>{
db.collection("pedidos").add({
cliente:details.payer.name.given_name,
email:details.payer.email_address,
productos:cart,
total:total,
fecha:new Date()
});
alert("Pago completado");
cart=[];
saveCart();
updateCart();
});
}
}).render("#paypal-button-container");
}

// CARGAR PRODUCTOS INICIAL
loadProducts();
