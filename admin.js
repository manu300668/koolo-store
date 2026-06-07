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

alert("1 - OK función");

const nombre =
document.getElementById("nombre").value;

const precio =
Number(document.getElementById("precio").value);

const stock =
Number(document.getElementById("stock").value);

const file =
document.getElementById("imagenFile").files[0];

alert("2 - datos leídos");

if(!file){
alert("No hay imagen");
return;
}

alert("3 - antes de storage");

try{

const storageRef =
firebase.storage().ref(
"productos/" + Date.now() + "_" + file.name
);

alert("4 - storage OK");

storageRef.put(file)
.then(()=>{
alert("5 - imagen subida");

return storageRef.getDownloadURL();
})
.then((url)=>{

alert("6 - URL OK");

return db.collection("productos").add({
nombre,
precio,
stock,
imagen:url,
tallas:["S","M","L","XL"]
});

})
.then(()=>{

alert("7 - producto creado");

})
.catch((error)=>{

alert("ERROR: " + error.message);

});

}catch(e){

alert("FALLO GRAVE: " + e.message);

}

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
