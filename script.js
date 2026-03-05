import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProducts() {

const container = document.getElementById("products-container");

container.innerHTML = "";

const querySnapshot = await getDocs(collection(db, "products"));

querySnapshot.forEach((doc) => {

const product = doc.data();

const productHTML = `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="price">€${product.price}</p>

<button class="add-cart">AÑADIR AL CARRITO</button>

</div>

`;

container.innerHTML += productHTML;

});

}

loadProducts();
