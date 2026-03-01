// HAMBURGUESA FUNCIONAL
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-right");

hamburger.addEventListener("click", ()=>{
  navMenu.classList.toggle("active");
});

// CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount(){
  const cartCount = document.getElementById("cartCount");
  if(cartCount){
    cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
  }
}
updateCartCount();
