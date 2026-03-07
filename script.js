const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",

authDomain: "koolo.es",

projectId: "TU_PROJECT_ID",

storageBucket: "TU_BUCKET",

messagingSenderId: "TU_ID",

appId: "TU_APP_ID"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

cargarProductos();
cargarConfig();

function cargarProductos(){

const contenedor = document.getElementById("productosContainer");

db.collection("productos").get().then((snapshot)=>{

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML += `

<div class="producto">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<button onclick="comprar('${doc.id}')">Comprar</button>

</div>

`;

});

});

}

function comprar(id){

alert("Checkout PayPal próximamente");

}

function cargarConfig(){

db.collection("config").doc("web").get().then(doc=>{

if(doc.exists){

const c = doc.data();

document.getElementById("tituloWeb").innerText = c.titulo;
document.getElementById("subtituloWeb").innerText = c.subtitulo;

document.getElementById("facebookLink").href = c.facebook;
document.getElementById("instagramLink").href = c.instagram;
document.getElementById("tiktokLink").href = c.tiktok;

if(c.logo){

document.getElementById("logoImg").src = c.logo;

}

}

});

}
