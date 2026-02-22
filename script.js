let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
carrito.forEach(item=>total+=item.precio);
actualizarCarrito();

// Añadir al carrito
function agregarAlCarrito(nombre, precio){
  carrito.push({nombre,precio});
  total+=precio;
  localStorage.setItem("carrito",JSON.stringify(carrito));
  actualizarCarrito();
  mostrarNotificacion(nombre+" añadido al carrito");
}

function actualizarCarrito(){
  const lista=document.getElementById("lista-carrito");
  lista.innerHTML="";
  carrito.forEach((item,index)=>{
    let li=document.createElement("li");
    li.innerHTML=`${item.nombre} - ${item.precio} € <button onclick="eliminarProducto(${index})">❌</button>`;
    lista.appendChild(li);
  });
  document.getElementById("total").textContent=total;
  document.getElementById("cart-count").textContent=carrito.length;
}

function eliminarProducto(index){
  total-=carrito[index].precio;
  carrito.splice(index,1);
  localStorage.setItem("carrito",JSON.stringify(carrito));
  actualizarCarrito();
}

function vaciarCarrito(){carrito=[];total=0;localStorage.setItem("carrito",JSON.stringify(carrito));actualizarCarrito();}

function toggleCarrito(){
  const c=document.getElementById("carrito");
  c.style.display=c.style.display==="block"?"none":"block";
}

// Login Modal
function abrirLogin(){document.getElementById("loginModal").style.display="flex";}
function cerrarLogin(){document.getElementById("loginModal").style.display="none";}

// Admin Modal
function abrirAdmin(){document.getElementById("adminModal").style.display="flex";}
function cerrarAdmin(){document.getElementById("adminModal").style.display="none";}

function entrarAdmin(){
  const pass=document.getElementById("adminPass").value;
  if(pass==="admin123"){ // contraseña fija
    document.getElementById("adminTools").style.display="block";
    mostrarNotificacion("Admin activado");
  } else {alert("Contraseña incorrecta");}
}

// Agregar productos desde Admin
function agregarProducto(){
  const nombre=document.getElementById("prodNombre").value;
  const precio=parseFloat(document.getElementById("prodPrecio").value);
  const categoria=document.getElementById("prodCategoria").value;
  const img=document.getElementById("prodImg").value;

  if(!nombre||!precio||!categoria||!img){alert("Completa todos los campos");return;}

  const contenedor=document.getElementById("productos");
  const div=document.createElement("div");
  div.className="producto";
  div.dataset.categoria=categoria;
  div.innerHTML=`<img src="${img}"><h2>${nombre}</h2><p>${precio} €</p><button onclick="agregarAlCarrito('${nombre}',${precio})">Añadir</button>`;
  contenedor.appendChild(div);

  mostrarNotificacion(nombre+" agregado");
}

// Categorías
function filtrarCategoria(cat){
  document.querySelectorAll(".producto").forEach(p=>{
    p.style.display=p.dataset.categoria===cat?"block":"none";
  });
}
function mostrarTodos(){document.querySelectorAll(".producto").forEach(p=>p.style.display="block");}

// Hamburguesa
function toggleMenu(){document.querySelector(".menu").classList.toggle("show");}

// Notificación
function mostrarNotificacion(texto){
  const n=document.createElement("div");
  n.className="notificacion";
  n.textContent=texto;
  document.body.appendChild(n);
  setTimeout(()=>{n.remove();},2000);
}

// Cerrar carrito al hacer click fuera
window.addEventListener("click",function(e){
  const c=document.getElementById("carrito");
  const icon=document.querySelector(".cart-icon");
  if(!c.contains(e.target)&&!icon.contains(e.target)){c.style.display="none";}
});
