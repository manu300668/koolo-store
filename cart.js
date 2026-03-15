let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("listaCarrito");
const total = document.getElementById("totalCarrito");

let suma = 0;

carrito.forEach((p,i)=>{

lista.innerHTML += `

<div style="margin:10px 0">

${p.nombre} - ${p.precio} €

<button onclick="eliminar(${i})">Eliminar</button>

</div>

`;

suma += p.precio;

});

total.innerText = suma;


function eliminar(i){

carrito.splice(i,1);

localStorage.setItem("carrito",JSON.stringify(carrito));

location.reload();

}
