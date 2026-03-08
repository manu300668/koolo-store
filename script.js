// Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo.es",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

let carrito = [];
let usuarioActual = null;

// Detectar usuario logueado
auth.onAuthStateChanged(user=>{
  if(user) usuarioActual = user.uid;
  else usuarioActual = null;
  cargarCarritoPersistente();
});

// Cargar productos
function cargarProductos(){
  const contenedor = document.getElementById("productosContainer");
  db.collection("productos").get().then(snapshot=>{
    contenedor.innerHTML = "";
    snapshot.forEach(doc=>{
      const p = doc.data();
      contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.precio} €</p>
        <button onclick="agregarCarrito('${p.nombre}',${p.precio})">Comprar</button>
      </div>`;
    });
  });
}

// Carrito
function agregarCarrito(nombre, precio){
  carrito.push({nombre, precio});
  actualizarCarrito();
  guardarCarritoPersistente();
}

function actualizarCarrito(){
  let total = 0;
  const contenedor = document.getElementById("carritoItems");
  contenedor.innerHTML = "";
  carrito.forEach(p=>{
    total += p.precio;
    contenedor.innerHTML += `<p>${p.nombre} - ${p.precio} €</p>`;
  });
  document.getElementById("carritoTotal").innerText = total;
  renderPaypal(total);
}

function abrirCarrito(){ document.getElementById("carritoPanel").style.right="0"; }
function cerrarCarrito(){ document.getElementById("carritoPanel").style.right="-420px"; }

// Carrito persistente
function guardarCarritoPersistente(){
  if(!usuarioActual) return;
  db.collection("usuarios").doc(usuarioActual).set({carrito});
}

function cargarCarritoPersistente(){
  if(!usuarioActual) return;
  db.collection("usuarios").doc(usuarioActual).get().then(doc=>{
    if(doc.exists && doc.data().carrito) carrito = doc.data().carrito;
    actualizarCarrito();
  });
}

// Checkout PayPal
function renderPaypal(total){
  document.getElementById("paypal-button-container").innerHTML="";
  if(total>0){
    paypal.Buttons({
      createOrder:function(data,actions){
        return actions.order.create({purchase_units:[{amount:{value:total.toFixed(2)}}]});
      },
      onApprove:function(data,actions){
        return actions.order.capture().then(details=>{
          alert("Pago completado por "+details.payer.name.given_name);
          guardarPedido(details);
          carrito=[];
          actualizarCarrito();
        });
      }
    }).render('#paypal-button-container');
  }
}

// Guardar pedido en Firestore
function guardarPedido(details){
  if(!usuarioActual) return;
  db.collection("usuarios").doc(usuarioActual).collection("pedidos").add({
    fecha:new Date(),
    total: parseFloat(document.getElementById("carritoTotal").innerText),
    productos: carrito,
    paypal: details
  });
}

// Config web
function cargarConfig(){
  db.collection("config").doc("web").get().then(doc=>{
    if(doc.exists){
      const c = doc.data();
      if(c.logo) document.getElementById("logoImg").src = c.logo;
      if(c.titulo) document.getElementById("tituloWeb").innerText = c.titulo;
      if(c.subtitulo) document.getElementById("subtituloWeb").innerText = c.subtitulo;
      if(c.facebook) document.getElementById("facebookLink").href = c.facebook;
      if(c.instagram) document.getElementById("instagramLink").href = c.instagram;
      if(c.tiktok) document.getElementById("tiktokLink").href = c.tiktok;
    }
  });
}

cargarProductos();
cargarConfig();
