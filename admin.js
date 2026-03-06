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
const storage = firebase.storage();


// AÑADIR PRODUCTO

function addProduct(){

const nombre = document.getElementById("nombre").value;
const precio = document.getElementById("precio").value;

const file = document.getElementById("imagen").files[0];

const storageRef = storage.ref("productos/"+file.name);

storageRef.put(file).then(snapshot=>{

snapshot.ref.getDownloadURL().then(url=>{

db.collection("productos").add({

nombre:nombre,
precio:parseFloat(precio),
imagen:url

}).then(()=>{

alert("Producto guardado");

loadProducts();

});

});

});

}



// CARGAR PRODUCTOS

function loadProducts(){

const container = document.getElementById("productsAdmin");

container.innerHTML="";

db.collection("productos").get().then(snapshot=>{

snapshot.forEach(doc=>{

const p = doc.data();

container.innerHTML += `

<div class="product-row">

<img src="${p.imagen}">

<span>${p.nombre}</span>

<span>€${p.precio}</span>

<button onclick="deleteProduct('${doc.id}')">Eliminar</button>

</div>

`;

});

});

}

loadProducts();



// ELIMINAR PRODUCTO

function deleteProduct(id){

db.collection("productos").doc(id).delete().then(()=>{

loadProducts();

});

}



// CARGAR PEDIDOS

function loadOrders(){

const container = document.getElementById("ordersAdmin");

container.innerHTML="";

db.collection("pedidos").get().then(snapshot=>{

snapshot.forEach(doc=>{

const p = doc.data();

container.innerHTML += `

<div class="order-row">

<p>Cliente: ${p.cliente}</p>

<p>Email: ${p.email}</p>

<p>Total: €${p.total}</p>

<hr>

</div>

`;

});

});

}

loadOrders();
