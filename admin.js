// 🔹 CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AQUI_VA_TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 CATEGORÍAS
const categoriesList = document.getElementById("categoriesList");
const productCategory = document.getElementById("productCategory");

function loadCategoriesAdmin(){
  db.collection("categories").orderBy("order").onSnapshot(snapshot=>{
    categoriesList.innerHTML = "";
    productCategory.innerHTML = "";
    snapshot.forEach(doc=>{
      const c = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="text" value="${c.name}" onchange="editCategory('${doc.id}', this.value)">
        <button onclick="deleteCategory('${doc.id}')">Eliminar</button>
      `;
      categoriesList.appendChild(li);

      const option = document.createElement("option");
      option.value = c.name;
      option.innerText = c.name;
      productCategory.appendChild(option);
    });
  });
}

function addCategory(){
  const name = document.getElementById("newCategory").value.trim();
  if(!name) return;
  db.collection("categories").add({name:name, order:Date.now()});
  document.getElementById("newCategory").value="";
}

function editCategory(id,newName){
  if(newName.trim()==="") return;
  db.collection("categories").doc(id).update({name:newName});
}

function deleteCategory(id){
  if(confirm("¿Eliminar categoría?")) db.collection("categories").doc(id).delete();
}

// 🔹 PRODUCTOS
const productsListAdmin = document.getElementById("productsListAdmin");
const previewImage = document.getElementById("previewImage");

document.getElementById("productImage").addEventListener("input", function(){
  if(this.value.trim()!==""){
    previewImage.src = this.value.trim();
    previewImage.style.display="block";
  } else {
    previewImage.style.display="none";
  }
});

function loadProductsAdmin(){
  db.collection("products").orderBy("createdAt","desc").onSnapshot(snapshot=>{
    productsListAdmin.innerHTML="";
    snapshot.forEach(doc=>{
      const p = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${p.image}" style="width:50px;height:50px;vertical-align:middle;border:1px solid #ccc;margin-right:5px;">
        <input type="text" value="${p.name}" onchange="editProduct('${doc.id}','name',this.value)">
        <input type="number" value="${p.price}" onchange="editProduct('${doc.id}','price',this.value)">
        <input type="number" value="${p.stock}" onchange="editProduct('${doc.id}','stock',this.value)">
        <select onchange="editProduct('${doc.id}','category',this.value)">
          ${document.getElementById('productCategory').innerHTML}
        </select>
        <button onclick="deleteProduct('${doc.id}')">Eliminar</button>
      `;
      // Set selected category
      li.querySelector('select').value = p.category;
      productsListAdmin.appendChild(li);
    });
  });
}

function addProduct(){
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const stock = parseInt(document.getElementById("productStock").value);
  const image = document.getElementById("productImage").value.trim();
  const category = document.getElementById("productCategory").value;

  if(!name || !price || !stock || !image || !category) return alert("Todos los campos son obligatorios");

  db.collection("products").add({
    name, price, stock, image, category, createdAt: Date.now()
  });

  document.getElementById("productName").value="";
  document.getElementById("productPrice").value="";
  document.getElementById("productStock").value="";
  document.getElementById("productImage").value="";
  previewImage.style.display="none";
}

function editProduct(id,field,value){
  if(field==="name" && value.trim()==="") return;
  let data = {};
  if(field==="price" || field==="stock") value = parseFloat(value);
  data[field] = value;
  db.collection("products").doc(id).update(data);
}

function deleteProduct(id){
  if(confirm("¿Eliminar producto?")) db.collection("products").doc(id).delete();
}

// 🔄 INICIAR
loadCategoriesAdmin();
loadProductsAdmin();
