const db = firebase.firestore();

let cart = [];

////////////////////////////////////////////////
// MENU
////////////////////////////////////////////////

function toggleMenu(){

let menu=document.getElementById("mobileMenu");

if(menu.style.display==="block"){
menu.style.display="none";
}else{
menu.style.display="block";
}

}

////////////////////////////////////////////////
// LOGIN
////////////////////////////////////////////////

function openLogin(){

document.getElementById("loginModal").style.display="flex";

}

function closeLogin(){

document.getElementById("loginModal").style.display="none";

}


function registerUser(){

let email=document.getElementById("userEmail").value;
let pass=document.getElementById("userPass").value;

firebase.auth().createUserWithEmailAndPassword(email,pass)

.then(()=>{

alert("Cuenta creada");

})

.catch(e=>{

document.getElementById("loginError").innerText=e.message;

});

}


function loginUser(){

let email=document.getElementById("userEmail").value;
let pass=document.getElementById("userPass").value;

firebase.auth().signInWithEmailAndPassword(email,pass)

.then(()=>{

closeLogin();

})

.catch(e=>{

document.getElementById("loginError").innerText=e.message;

});

}

////////////////////////////////////////////////
// ADMIN
////////////////////////////////////////////////

firebase.auth().onAuthStateChanged(user=>{

if(user){

if(user.email==="eumanu@msn.com"){

document.getElementById("adminBtn").style.display="block";

}

}

});

////////////////////////////////////////////////
// PRODUCTOS
////////////////////////////////////////////////

function loadProducts(){

db.collection("products").get().then(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let p=doc.data();

html+=`

<div class="product">

<img src="${p.image}">

<h3>${p.name}</h3>

<p>${p.price}€</p>

<button onclick="addCart('${p.name}',${p.price})">
Añadir al carrito
</button>

</div>

`;

});

document.getElementById("products").innerHTML=html;

});

}

loadProducts();

////////////////////////////////////////////////
// CARRITO
////////////////////////////////////////////////

function addCart(name,price){

cart.push({name,price});

document.getElementById("cartCount").innerText=cart.length;

}
