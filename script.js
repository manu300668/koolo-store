// FIREBASE

const firebaseConfig = {
apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.firebasestorage.app",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// CARRITO

let cart = []

const cartIcon = document.getElementById("cartIcon")
const cartPanel = document.getElementById("cartPanel")

cartIcon.onclick = () => {

cartPanel.classList.toggle("open")

}


// CARGAR PRODUCTOS

function loadProducts(){

const container = document.getElementById("productsList")

db.collection("productos").get().then(snapshot=>{

snapshot.forEach(doc=>{

const p = doc.data()

container.innerHTML += `

<div class="product">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>€${p.precio}</p>

<button onclick="addToCart('${p.nombre}',${p.precio})">
Añadir al carrito
</button>

</div>

`

})

})

}

loadProducts()


// AÑADIR CARRITO

function addToCart(name,price){

cart.push({name,price})

updateCart()

}


// ACTUALIZAR CARRITO

function updateCart(){

const cartItems = document.getElementById("cartItems")

const cartTotal = document.getElementById("cartTotal")

const cartCount = document.getElementById("cartCount")

cartItems.innerHTML=""

let total = 0

cart.forEach(item=>{

total += item.price

cartItems.innerHTML += `

<p>${item.name} - €${item.price}</p>

`

})

cartTotal.innerText = total

cartCount.innerText = cart.length

renderPaypal(total)

}


// PAYPAL CHECKOUT

function renderPaypal(total){

document.getElementById("paypal-button-container").innerHTML=""

paypal.Buttons({

createOrder:function(data,actions){

return actions.order.create({

purchase_units:[{

amount:{ value: total.toString() }

}]

})

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

alert("Pago completado")

cart = []

updateCart()

})

}

}).render("#paypal-button-container")

}
