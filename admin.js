const firebaseConfig = {
apiKey:"TU_API_KEY",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.firebasestorage.app",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig)

const db=firebase.firestore()

function addProduct(){

const nombre=document.getElementById("nombre").value
const precio=document.getElementById("precio").value
const imagen=document.getElementById("imagen").value

db.collection("productos").add({

nombre:nombre,
precio:parseFloat(precio),
imagen:imagen

}).then(()=>{

alert("Producto guardado")

loadProducts()

})

}


function loadProducts(){

const container=document.getElementById("productsAdmin")

container.innerHTML=""

db.collection("productos").get().then(snapshot=>{

snapshot.forEach(doc=>{

const p=doc.data()

container.innerHTML+=`

<div class="product-row">

<img src="${p.imagen}">

<span>${p.nombre}</span>

<span>€${p.precio}</span>

<button onclick="deleteProduct('${doc.id}')">Eliminar</button>

</div>

`

})

})

}

loadProducts()


function deleteProduct(id){

db.collection("productos").doc(id).delete().then(()=>{

loadProducts()

})

}
