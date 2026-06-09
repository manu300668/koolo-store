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

firebase.initializeApp(firebaseConfig);
alert(firebase.app().options.storageBucket);
const db = firebase.firestore();

// ==========================
// LOGIN SIMPLE
// ==========================

function login(){

const user =
document.getElementById("user").value;

const pass =
document.getElementById("pass").value;

if(user === "koolo" && pass === "Manu68."){

document.getElementById("loginBox").style.display = "none";

document.getElementById("adminPanel").style.display = "block";

cargarAdmin();

}else{

alert("Error login");

}

}

// ==========================
// CARGAR PANEL
// ==========================

function cargarAdmin(){

// PRODUCTOS

db.collection("productos").onSnapshot((snap)=>{

const cont =
document.getElementById("productosAdmin");

if(!cont) return;

cont.innerHTML = "";

snap.forEach((doc)=>{

  const p = doc.data();

  cont.innerHTML += `

  <div class="checkout-card">

    <h3>${p.nombre || ""}</h3>

    <p>${p.precio || 0} €</p>

    <p>Stock: ${p.stock || 0}</p>

    <button onclick="borrarProd('${doc.id}')">
      Eliminar
    </button>

  </div>

  `;

});

});

// PEDIDOS

db.collection("pedidos").onSnapshot((snap)=>{

const cont =
document.getElementById("pedidosAdmin");

if(!cont) return;

cont.innerHTML = "";

snap.forEach((doc)=>{

  const p = doc.data();

  cont.innerHTML += `

  <div class="checkout-card">

    <h3>${p.referenciaPedido || "Pedido"}</h3>

    <p>${p.total || 0} €</p>

    <p>${p.estado || "Pendiente"}</p>

  </div>

  `;

});

});

}

// ==========================
// CREAR PRODUCTO
// ==========================

function crearProducto(){

const nombre = document.getElementById("nombre").value;
const precio = Number(document.getElementById("precio").value);
const stock = Number(document.getElementById("stock").value);
const file = document.getElementById("imagenFile").files[0];

if(!nombre || !precio || !stock){
alert("Faltan datos");
return;
}

if(!file){
alert("Selecciona imagen");
return;
}

// nombre único para evitar conflictos
const fileName = "productos/" + Date.now() + "_" + file.name;

const storageRef = firebase.storage().ref().child(fileName);

storageRef.put(file)
.then(snapshot => {

return snapshot.ref.getDownloadURL();

})
.then(url => {

return db.collection("productos").add({
nombre: nombre,
precio: precio,
stock: stock,
imagen: url,
tallas: ["S","M","L","XL"]
});

})
.then(() => {

alert("PRODUCTO CREADO CON IMAGEN");

document.getElementById("nombre").value = "";
document.getElementById("precio").value = "";
document.getElementById("stock").value = "";
document.getElementById("imagenFile").value = "";

})
.catch(error => {

alert("ERROR: " + error.message);
console.error(error);

});

}

// ==========================
// BORRAR PRODUCTO
// ==========================

function borrarProd(id){

if(confirm("¿Eliminar producto?")){

db.collection("productos")
.doc(id)
.delete();

}

}
