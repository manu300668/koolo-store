// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {
  
apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// ==========================
// PROTEGER PANEL
// ==========================

auth.onAuthStateChanged(user => {

if(!user){

window.location.href = "admin-login.html";

}

});


// ==========================
// LOGOUT
// ==========================

function logout(){

auth.signOut().then(()=>{

window.location.href = "admin-login.html";

});

}


// ==========================
// CREAR PRODUCTO
// ==========================

function crearProducto(){

const nombre =
document.getElementById("nombre").value.trim();

const precio =
parseFloat(document.getElementById("precio").value);

const imagen =
document.getElementById("imagen").value.trim();

const stock =
parseInt(document.getElementById("stock").value);

const descripcion =
document.getElementById("descripcion").value.trim();

if(!nombre || !precio || !imagen){

alert("Rellena los campos obligatorios");

return;

}

db.collection("productos").add({

nombre,
precio,
imagen,
stock,
descripcion

}).then(()=>{

alert("Producto creado");

location.reload();

});

}


// ==========================
// CARGAR PRODUCTOS
// ==========================

function cargarProductos(){

const lista =
document.getElementById("listaProductos");

db.collection("productos").onSnapshot(snapshot=>{

lista.innerHTML = "";

snapshot.forEach(doc=>{

const p = doc.data();

lista.innerHTML += `

<div class="producto-admin">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<p>${p.descripcion || ""}</p>

<button onclick="eliminarProducto('${doc.id}')"
class="delete-btn">

Eliminar

</button>

</div>

`;

});

});

}


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(id){

if(!confirm("¿Eliminar producto?")) return;

db.collection("productos").doc(id).delete();

}


// ==========================
// CARGAR PEDIDOS
// ==========================

function cargarPedidos(){

const lista =
document.getElementById("listaPedidos");

db.collection("pedidos")
.orderBy("fechaCreacion","desc")
.onSnapshot(snapshot=>{

lista.innerHTML = "";

if(snapshot.empty){

lista.innerHTML = "<p>No hay pedidos</p>";

return;

}

snapshot.forEach(doc=>{

const p = doc.data();

lista.innerHTML += `

<div class="pedido-admin">

<h3>Pedido: ${p.referenciaPedido}</h3>

<p><strong>${p.nombre}</strong></p>

<p>${p.telefono}</p>

<p>${p.direccion}, ${p.ciudad}</p>

<p>Total: ${p.total} €</p>

<p>Estado: ${p.estado}</p>

<select class="estado-select"
onchange="cambiarEstado('${doc.id}', this.value)">

<option value="pendiente" ${p.estado==="pendiente"?"selected":""}>Pendiente</option>
<option value="pagado" ${p.estado==="pagado"?"selected":""}>Pagado</option>
<option value="enviado" ${p.estado==="enviado"?"selected":""}>Enviado</option>
<option value="entregado" ${p.estado==="entregado"?"selected":""}>Entregado</option>
<option value="cancelado" ${p.estado==="cancelado"?"selected":""}>Cancelado</option>

</select>

</div>

`;

});

});

}


// ==========================
// CAMBIAR ESTADO PEDIDO
// ==========================

function cambiarEstado(id, estado){

db.collection("pedidos").doc(id).update({

estado:estado

});

}


// ==========================
// INICIAR
// ==========================

cargarProductos();
cargarPedidos();
