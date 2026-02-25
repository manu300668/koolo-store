let products = JSON.parse(localStorage.getItem("products")) || [
  {id:1, name:"Sudadera Urban", price:49}
];

let categories = JSON.parse(localStorage.getItem("categories")) || ["Ropa"];
let socials = JSON.parse(localStorage.getItem("socials")) || [];
let adminPassword = localStorage.getItem("adminPass") || "1234";

let cart = 0;
let secretWord = "kooloadmin";
let typed = "";

document.addEventListener("keydown", e => {
  typed += e.key;
  if(typed.includes(secretWord)){
    showAdminButton();
    typed = "";
  }
});

function showAdminButton(){
  if(!document.getElementById("adminBtn")){
    let btn = document.createElement("button");
    btn.id="adminBtn";
    btn.innerText="ADMIN";
    btn.onclick=()=>document.getElementById("loginModal").style.display="flex";
    document.querySelector("header").appendChild(btn);
  }
}

function loginAdmin(){
  let pass = document.getElementById("adminPass").value;
  if(pass===adminPassword){
    document.getElementById("loginModal").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    renderAdmin();
  } else alert("Contraseña incorrecta");
}

function logoutAdmin(){
  document.getElementById("adminPanel").style.display="none";
}

function changePassword(){
  adminPassword = document.getElementById("newPass").value;
  localStorage.setItem("adminPass", adminPassword);
  alert("Contraseña cambiada");
}

function renderProducts(){
  let container = document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    container.innerHTML+=`
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.price}€</p>
        <button onclick="addCart()">Añadir</button>
      </div>`;
  });
  localStorage.setItem("products", JSON.stringify(products));
}

function addCart(){
  cart++;
  document.getElementById("cart-count").innerText=cart;
}

function addProduct(){
  let name=document.getElementById("prodName").value;
  let price=document.getElementById("prodPrice").value;
  products.push({id:Date.now(), name, price});
  renderProducts();
  renderAdmin();
}

function deleteProduct(id){
  products=products.filter(p=>p.id!==id);
  renderProducts();
  renderAdmin();
}

function renderAdmin(){
  let prodDiv=document.getElementById("adminProducts");
  prodDiv.innerHTML="";
  products.forEach(p=>{
    prodDiv.innerHTML+=`
      <div>${p.name} - ${p.price}€
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
      </div>`;
  });

  let catDiv=document.getElementById("adminCategories");
  catDiv.innerHTML="";
  categories.forEach((c,i)=>{
    catDiv.innerHTML+=`
      <div>${c}
      <button onclick="deleteCategory(${i})">Eliminar</button>
      </div>`;
  });

  let socDiv=document.getElementById("adminSocials");
  socDiv.innerHTML="";
  socials.forEach((s,i)=>{
    socDiv.innerHTML+=`
      <div>${s.name}
      <button onclick="deleteSocial(${i})">Eliminar</button>
      </div>`;
  });
}

function addCategory(){
  let name=document.getElementById("catName").value;
  categories.push(name);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderAdmin();
}

function deleteCategory(i){
  categories.splice(i,1);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderAdmin();
}

function addSocial(){
  let name=document.getElementById("socialName").value;
  let link=document.getElementById("socialLink").value;
  socials.push({name,link});
  localStorage.setItem("socials", JSON.stringify(socials));
  renderAdmin();
}

function deleteSocial(i){
  socials.splice(i,1);
  localStorage.setItem("socials", JSON.stringify(socials));
  renderAdmin();
}

renderProducts();
