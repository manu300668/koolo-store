let products = [
  {id:1, name:"Sudadera Urban", price:49, category:"Ropa"},
  {id:2, name:"Gorra Street", price:25, category:"Accesorios"}
];

let categories = ["Inicio","Ropa","Accesorios"];
let cart = [];
let adminPassword = "1234";

let secretWord = "kooloadmin";
let typed = "";

/* ---------- MENU ---------- */

function renderMenu(){
  let menu = document.getElementById("menuList");
  menu.innerHTML="";
  categories.forEach(cat=>{
    menu.innerHTML+=`<li onclick="filterCategory('${cat}')">${cat}</li>`;
  });
}

function filterCategory(cat){
  if(cat==="Inicio"){ renderProducts(products); return; }
  let filtered = products.filter(p=>p.category===cat);
  renderProducts(filtered);
}

/* ---------- PRODUCTOS ---------- */

function renderProducts(list){
  let container = document.getElementById("products");
  container.innerHTML="";
  list.forEach(p=>{
    container.innerHTML+=`
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.price}€</p>
        <button onclick="addToCart(${p.id})">Añadir</button>
      </div>`;
  });
}

function addToCart(id){
  let product = products.find(p=>p.id===id);
  cart.push(product);
  document.getElementById("cartCount").innerText=cart.length;
}

/* ---------- CARRITO ---------- */

document.getElementById("cartIcon").onclick=()=>{
  document.getElementById("cartPanel").classList.add("open");
  renderCart();
};

function renderCart(){
  let container=document.getElementById("cartItems");
  container.innerHTML="";
  cart.forEach(p=>{
    container.innerHTML+=`<p>${p.name} - ${p.price}€</p>`;
  });
}

function closeCart(){
  document.getElementById("cartPanel").classList.remove("open");
}

/* ---------- LOGIN ---------- */

document.getElementById("loginBtn").onclick=()=>{
  document.getElementById("loginModal").style.display="flex";
};

function loginAdmin(){
  let pass=document.getElementById("adminPass").value;
  if(pass===adminPassword){
    document.getElementById("loginModal").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    renderAdmin();
  }else{
    alert("Contraseña incorrecta");
  }
}

function logoutAdmin(){
  document.getElementById("adminPanel").style.display="none";
}

/* ---------- ADMIN ---------- */

function renderAdmin(){
  let div=document.getElementById("adminProducts");
  div.innerHTML="";
  products.forEach(p=>{
    div.innerHTML+=`
      <div>
        ${p.name} - ${p.price}€
        <button onclick="deleteProduct(${p.id})">Eliminar</button>
      </div>`;
  });
}

function addProduct(){
  let name=document.getElementById("prodName").value;
  let price=document.getElementById("prodPrice").value;
  products.push({id:Date.now(), name, price, category:"Ropa"});
  renderProducts(products);
  renderAdmin();
}

function deleteProduct(id){
  products = products.filter(p=>p.id!==id);
  renderProducts(products);
  renderAdmin();
}

/* ---------- ADMIN OCULTO ---------- */

document.addEventListener("keydown", e=>{
  typed+=e.key;
  if(typed.includes(secretWord)){
    alert("Modo Admin Activado");
    document.getElementById("loginBtn").style.display="inline-block";
    typed="";
  }
});

/* ---------- INIT ---------- */

renderMenu();
renderProducts(products);
