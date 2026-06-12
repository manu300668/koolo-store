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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

let productoEditando = null;


// ==========================
// LOGIN SIMPLE
// ==========================

function login() {

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "koolo" && pass === "Manu68.") {

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    cargarAdmin();

  } else {

    alert("Error login");

  }

}


// ==========================
// CARGAR PANEL
// ==========================

function cargarAdmin() {

  // PRODUCTOS

  db.collection("productos").onSnapshot((snap) => {

    const cont =
      document.getElementById("productosAdmin");

    if (!cont) return;

    cont.innerHTML = "";

    snap.forEach((doc) => {

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

        <button onclick="borrarPedido('${doc.id}')">
         Eliminar
        </button>

       </div>

      `;

    });

  });


  // PEDIDOS

  db.collection("pedidos").onSnapshot((snap) => {

    const cont =
      document.getElementById("pedidosAdmin");

    if (!cont) return;

    cont.innerHTML = "";

    snap.forEach((doc) => {

      const p = doc.data();

      cont.innerHTML += `

      <div class="checkout-card">

        <h3>${p.referenciaPedido || "Pedido"}</h3>

<button onclick='verPedido(${JSON.stringify(doc.data())})'>
Ver detalle
</button>

        <p>${p.total || 0} €</p>

        <p>Estado: ${p.estado || ""}</p>

        <button onclick="cambiarEstado('${doc.id}','Enviado')">
          Enviado
        </button>

        <button onclick="cambiarEstado('${doc.id}','Entregado')">
          Entregado
        </button>

      </div>

      `;

    });

  });

}


// ==========================
// CREAR PRODUCTO
// ==========================

function crearProducto() {

  const nombre =
    document.getElementById("nombre").value;

  const descripcion =
    document.getElementById("descripcion").value;

  const precio =
    Number(document.getElementById("precio").value);

  const stock =
    Number(document.getElementById("stock").value);

  const imagen =
    document.getElementById("imagenUrl").value;

  if (!nombre) {

    alert("Introduce nombre");
    return;

  }

  db.collection("productos").add({

    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    tallas: ["S", "M", "L", "XL"]

  })
  .then(() => {

    alert("Producto creado");

    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imagenUrl").value = "";

  })
  .catch((err) => {

    alert("Error: " + err.message);

  });

}


// ==========================
// EDITAR PRODUCTO
// ==========================

function editarProd(id) {

  productoEditando = id;

  db.collection("productos")
    .doc(id)
    .get()
    .then((doc) => {

      const p = doc.data();

      document.getElementById("editorProducto").style.display =
        "block";

      document.getElementById("editNombre").value =
        p.nombre || "";

      document.getElementById("editDescripcion").value =
        p.descripcion || "";

      document.getElementById("editPrecio").value =
        p.precio || 0;

      document.getElementById("editStock").value =
        p.stock || 0;

      document.getElementById("editImagen").value =
        p.imagen || "";

      document.getElementById("previewImagen").src =
        p.imagen || "";

    });

}


// ==========================
// GUARDAR EDICIÓN
// ==========================

function guardarEdicion() {

  if (!productoEditando) return;

  const nombre =
    document.getElementById("editNombre").value;

  const descripcion =
    document.getElementById("editDescripcion").value;

  const precio =
    Number(document.getElementById("editPrecio").value);

  const stock =
    Number(document.getElementById("editStock").value);

  const imagen =
    document.getElementById("editImagen").value;

  db.collection("productos")
    .doc(productoEditando)
    .update({

      nombre,
      descripcion,
      precio,
      stock,
      imagen

    })
    .then(() => {

      alert("Producto actualizado");

      document.getElementById("editorProducto").style.display =
        "none";

      productoEditando = null;

    })
    .catch((err) => {

      alert("Error: " + err.message);

    });

}


// ==========================
// BORRAR PRODUCTO
// ==========================

function borrarProd(id) {

  if (confirm("¿Eliminar producto?")) {

    db.collection("productos")
      .doc(id)
      .delete();

  }

}


// ==========================
// VISTA PREVIA IMAGEN
// ==========================

document.addEventListener("input", (e) => {

  if (e.target.id === "editImagen") {

    document.getElementById("previewImagen").src =
      e.target.value;

  }

});


// ==========================
// CAMBIAR ESTADO PEDIDO
// ==========================

function cambiarEstado(id, estado) {

  db.collection("pedidos")
    .doc(id)
    .update({
      estado: estado
    })
    .then(() => {

      alert("Estado actualizado");

    })
    .catch((err) => {

      alert("Error: " + err.message);

    });

}
function verPedido(p){

let productosTexto = "";

p.productos.forEach(prod=>{
productosTexto += `
- ${prod.nombre} (${prod.talla}) x${prod.cantidad}
`;
});

alert(
"PEDIDO: " + p.referenciaPedido +
"\n\nCLIENTE: " + p.cliente.nombre +
"\nTEL: " + p.cliente.telefono +
"\nEMAIL: " + p.cliente.email +
"\nDIRECCIÓN: " + p.cliente.direccion +
"\n\nPRODUCTOS:\n" + productosTexto +
"\n\nTOTAL: " + p.total + " €"
);

}
