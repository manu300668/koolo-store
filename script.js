// ==========================
// FIREBASE
// ==========================

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.appspot.com",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2de43851c225c74db"

};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


// ==========================
// CARRITO
// ==========================

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];
let categoriaActual = "todos";

// ==========================
// GUARDAR CARRITO
// ==========================

function guardarCarrito(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}


// ==========================
// TOAST
// ==========================

function mostrarToast(texto){

const toast =
document.createElement("div");

toast.className =
"toast-cart";

toast.innerText =
texto;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},1800);

}


// ==========================
// RENDER HEADER CARRITO
// ==========================

function renderCarrito(){

const cartCount =
document.getElementById(
"cartCount"
);

if(!cartCount) return;

let totalItems = 0;

carrito.forEach(item=>{

totalItems +=
Number(item.cantidad) || 0;

});

cartCount.innerText =
totalItems;

guardarCarrito();

}


// ==========================
// CARGAR PRODUCTOS
// ==========================

function cargarProductos(){

const container =
document.getElementById(
"productosContainer"
);

const template =
document.getElementById(
"productoTemplate"
);

if(!container) return;

db.collection("productos")
.onSnapshot(snapshot=>{

container.innerHTML = "";

snapshot.forEach(doc=>{
const producto = doc.data();

if(
categoriaActual !== "todos" &&
producto.categoria !== categoriaActual
){
return;
}
const producto =
doc.data();

const stock =
Number(producto.stock || 0);

const clone =
template.content
.cloneNode(true);


// imagen

clone.querySelector(
".producto-img"
).src =
producto.imagen ||
"https://via.placeholder.com/400x400?text=KOOLO";


// alt

clone.querySelector(
".producto-img"
).alt =
producto.nombre;


// nombre

clone.querySelector(
".producto-nombre"
).innerText =
producto.nombre;


// descripción

clone.querySelector(
".producto-descripcion"
).innerText =
producto.descripcion || "";


// precio

clone.querySelector(
".precio"
).innerText =

Number(producto.precio)
.toFixed(2)

+ " €";


// stock

clone.querySelector(
".stock-text"
).innerText =

"Stock: " + stock;


// talla

const tallaSelect =
clone.querySelector(
".talla-select"
);


// botón comprar

const botonComprar =
clone.querySelector(
".btn-comprar"
);

botonComprar.addEventListener(
"click",

()=>{

const talla =
tallaSelect.value;

if(!talla){

mostrarToast(
"Selecciona talla"
);

return;

}

sumarProducto(
doc.id,
producto,
talla
);

}

);

container.appendChild(
clone
);

});

});

}


// ==========================
// SUMAR PRODUCTO
// ==========================

function sumarProducto(
id,
producto,
talla
){

const stock =
Number(
producto.stock || 0
);

const index =
carrito.findIndex(

p =>

p.id === id &&

p.talla === talla

);


if(index !== -1){

if(
carrito[index]
.cantidad >= stock
){

mostrarToast(
"No hay más stock"
);

return;

}

carrito[index]
.cantidad++;

}else{

carrito.push({

id,

nombre:
producto.nombre,

precio:
Number(
producto.precio
),

imagen:
producto.imagen,

cantidad:1,

talla

});

}


// guardar

guardarCarrito();


// render

renderCarrito();


// toast

mostrarToast(
"Producto añadido"
);


// animación carrito

const cart =
document.querySelector(
".cart-header"
);

if(cart){

cart.classList.add(
"bump"
);

setTimeout(()=>{

cart.classList.remove(
"bump"
);

},250);

}

}


// ==========================
// CHECKOUT
// ==========================

function irCheckout(){

if(
carrito.length === 0
){

mostrarToast(
"El carrito está vacío"
);

return;

}

window.location.href =
"checkout.html";

}


// ==========================
// INIT
// ==========================

document.addEventListener(

"DOMContentLoaded",

()=>{

renderCarrito();

cargarProductos();

}

);
