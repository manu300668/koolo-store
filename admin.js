// FIREBASE
const firebaseConfig = {
apiKey:"TU_API_KEY",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.firebasestorage.app",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// LOGIN ADMIN
const loginDiv = document.getElementById("loginDiv");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

// Cambia estos datos
const ADMIN_EMAIL = "eumanu@msn.com";
const ADMIN_PASS = "TU_CONTRASEÑA_ADMIN";

loginBtn.onclick = ()=>{
const email = document.getElementById("adminEmail").value;
const pass = document.getElementById("adminPass").value;

if(email===ADMIN_EMAIL && pass===ADMIN_PASS){
loginDiv.style.display="none";
adminPanel.style.display="block";
loadProducts();
loadOrders();
}else{
loginError.innerText="Credenciales incorrectas";
}
};

// PRODUCTOS
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", async (e)=>{
e.preventDefault();
const name = document.getElementById("prodName").value;
const price = parseFloat(document.getElementById("prodPrice").value);
const category = document.getElementById("prodCategory").value;
const file = document.getElementById("prodImage").files[0];
const storageRef = storage.ref().child(`productos/${file.name}`);
await storageRef.put(file);
const url = await storageRef.getDownloadURL();

db.collection("productos").add({
nombre:name,
precio:price,
categoria:category,
imagen:url
});

productForm.reset();
loadProducts();
});

// LISTAR PRODUCTOS
function loadProducts(){
const container = document.getElementById("productsList");
container.innerHTML="";
db.collection("productos").get().then(snapshot=>{
snapshot.forEach(doc=>{
const p
