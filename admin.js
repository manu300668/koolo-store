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

  <button onclick="editarProd('${doc.id}')">
  Editar
</button>

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

const nombre =
document.getElementById("nombre").value;

const precio =
Number(document.getElementById("precio").value);

const stock =
Number(document.getElementById("stock").value);

const imagen =
document.getElementById("imagenUrl").value;

if(!nombre){
alert("Introduce nombre");
return;
}

db.collection("productos").add({

nombre,
precio,
stock,
imagen,
tallas:["S","M","L","XL"]

})
.then(()=>{

alert("Producto creado");

document.getElementById("nombre").value = "";
document.getElementById("precio").value = "";
document.getElementById("stock").value = "";
document.getElementById("imagenUrl").value = "";

})
.catch((err)=>{

alert("Error: " + err.message);

});

}

// ==========================
// BORRAR PRODUCTO
// ==========================

// ==========================
// EDITAR PRODUCTO
// ==========================

function editarProd(id){

db.collection("productos")
.doc(id)
.get()
.then((doc)=>{

if(!doc.exists){
alert("Producto no encontrado");
return;
}

const p = doc.data();

const nombre =
prompt(
"Nombre:",
p.nombre || ""
);

if(nombre === null) return;

const precio =
Number(
prompt(
"Precio:",
p.precio || 0
)
);

if(isNaN(precio)) return;

const stock =
Number(
prompt(
"Stock:",
p.stock || 0
)
);

if(isNaN(stock)) return;

const imagen =
prompt(
"URL imagen:",
p.imagen || ""
);

if(imagen === null) return;

db.collection("productos")
.doc(id)
.update({

nombre,
precio,
stock,
imagen

})
.then(()=>{

alert("Producto actualizado");

})
.catch((err)=>{

alert(
"Error: " +
err.message
);

});

});

}
function borrarProd(id){

if(confirm("¿Eliminar producto?")){

db.collection("productos")
.doc(id)
.delete();

}

}
