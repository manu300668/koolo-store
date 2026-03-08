// CONFIG FIREBASE
const firebaseConfig = {
  // PON AQUÍ TUS DATOS DE FIREBASE
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo.es.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// INICIAR FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CARGAR PRODUCTOS
function cargarProductos(){

  const contenedor = document.getElementById("productosContainer");

  if(!contenedor){
    console.error("No existe el contenedor productosContainer en index.html");
    return;
  }

  contenedor.innerHTML = "<p>Cargando productos...</p>";

  db.collection("productos").get()

  .then(snapshot => {

    if(snapshot.empty){

      contenedor.innerHTML = `
      <div style="text-align:center;padding:40px;">
        <h2>No hay productos todavía</h2>
        <p>Añade productos desde el panel admin</p>
      </div>
      `;

      return;
    }

    contenedor.innerHTML = "";

    snapshot.forEach(doc => {

      const producto = doc.data();

      contenedor.innerHTML += `
      <div class="producto">

        <img src="${producto.imagen}" alt="${producto.nombre}">

        <h3>${producto.nombre}</h3>

        <p>${producto.precio} €</p>

        <button onclick="agregarCarrito('${producto.nombre}',${producto.precio})">
        Comprar
        </button>

      </div>
      `;

    });

  })

  .catch(error => {

    console.error("Error cargando productos:", error);

    contenedor.innerHTML = `
    <div style="text-align:center;padding:40px;color:red;">
      Error cargando productos
    </div>
    `;

  });

}

// CARRITO SIMPLE
let carrito = [];

function agregarCarrito(nombre, precio){

  carrito.push({nombre, precio});

  alert(nombre + " añadido al carrito");

}

// INICIAR CARGA
document.addEventListener("DOMContentLoaded", () => {

  console.log("Koolo cargado");

  cargarProductos();

});
