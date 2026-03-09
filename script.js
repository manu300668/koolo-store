// CONFIG FIREBASE

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",

authDomain: "koolo.es.firebaseapp.com",

projectId: "Koolo2026",

storageBucket: "TU_PROYECTO.appspot.com",

messagingSenderId: "XXXX",

appId: "XXXX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// CARGAR PRODUCTOS

function cargarProductos(){

const contenedor = document.getElementById("productosContainer");

contenedor.innerHTML = "Cargando productos...";

db.collection("productos").get()

.then(snapshot=>{

if(snapshot.empty){

contenedor.innerHTML="No hay productos todavía";

return;

}

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML+=`

<div class="producto">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<button>Comprar</button>

</div>

`;

});

})

.catch(error=>{

console.error(error);

contenedor.innerHTML="Error cargando productos";

});

}


// INICIAR

document.addEventListener("DOMContentLoaded",()=>{

cargarProductos();

});
