// Config Firebase
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

// ✅ CATEGORÍAS
const categoriesList = document.getElementById("categoriesList");
const productCategory = document.getElementById("productCategory");

function loadCategoriesAdmin(){
  db.collection("categories").orderBy("order").onSnapshot(snapshot=>{
    categoriesList.innerHTML = "";
    productCategory.innerHTML = "";
    snapshot.forEach(doc=>{
      const c = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `${c.name} <button onclick="deleteCategory('${doc.id}')">Eliminar</button>`;
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
  if(name==="") return;
  db.collection("categories").add({name:name, order:Date.now()});
  document.getElementById("newCategory").value="";
}

function deleteCategory(id){
  if(confirm("¿Eliminar categoría?")) db.collection("categories").doc(id).delete();
}

// ✅ PRODUCTOS
const productsListAdmin = document.getElementById("productsListAdmin");

function loadProductsAdmin(){
  db.collection("products").orderBy("createdAt","desc").onSnapshot(snapshot=>{
    productsListAdmin.innerHTML="";
    snapshot.forEach(doc=>{
      const p = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `${p.name} (${p.category}) - ${p.price}€ - Stock:${p.stock} 
        <button onclick="deleteProduct('${doc.id}')">Eliminar</button>`;
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
}

function deleteProduct(id){
  if(confirm("¿Eliminar producto?")) db.collection("products").doc(id).delete();
}

// 🔄 INICIAR
loadCategoriesAdmin();
loadProductsAdmin();
