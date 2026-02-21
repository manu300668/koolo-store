let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// RECONSTRUIR TOTAL
carrito.forEach(item => total += item.precio);

actualizarCarrito();

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  guardarCarrito();
  actualizarCarrito();
  mostrarNotificacion(nombre + " añadido al carrito");
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.precio} €
      <button onclick="eliminarProducto(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
  document.getElementById("cart-count").textContent = carrito.length;
}

function eliminarProducto(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function toggleCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.style.display =
    carritoDiv.style.display === "block" ? "none" : "block";
}

// Cerrar carrito al hacer click fuera
window.addEventListener("click", function(e) {
  const carritoDiv = document.getElementById("carrito");
  const icon = document.querySelector(".cart-icon");

  if (!carritoDiv.contains(e.target) && !icon.contains(e.target)) {
    carritoDiv.style.display = "none";
  }
});

function abrirLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function cerrarLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function filtrarCategoria(categoria) {
  const productos = document.querySelectorAll(".producto");

  productos.forEach(p => {
    if (p.dataset.categoria === categoria) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

function mostrarTodos() {
  const productos = document.querySelectorAll(".producto");
  productos.forEach(p => p.style.display = "block");
}

// NOTIFICACIÓN ELEGANTE
function mostrarNotificacion(texto) {
  const noti = document.createElement("div");
  noti.textContent = texto;
  noti.className = "notificacion";

  document.body.appendChild(noti);

  setTimeout(() => {
    noti.remove();
  }, 2000);
}
