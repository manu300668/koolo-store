const firebaseConfig = {

apiKey:"TU_API_KEY",

authDomain:"koolo2026.firebaseapp.com",

projectId:"koolo2026"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

db.collection("productos").doc(id).get().then(doc=>{

const p = doc.data();

document.getElementById("productPage").innerHTML = `

<img src="${p.imagen}">

<h1>${p.nombre}</h1>

<p>€${p.precio}</p>

<p>${p.descripcion || ""}</p>

<button onclick="addToCart('${p.nombre}',${p.precio})">

Añadir al carrito

</button>

`;

});
