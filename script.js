<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>

<script>
  // Configuración Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
    authDomain: "koolo2026.firebaseapp.com",
    projectId: "koolo2026",
    storageBucket: "koolo2026.firebasestorage.app",
    messagingSenderId: "612039099714",
    appId: "1:612039099714:web:38d14c2d43851c225c74db"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  // LOGIN
  function loginAdmin() {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById("adminPanel").style.display = "block";
        alert("Bienvenido Admin");
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  }

  // LOGOUT
  function logoutAdmin() {
    auth.signOut().then(() => {
      document.getElementById("adminPanel").style.display = "none";
    });
  }

  // Añadir producto
  function addProduct() {
    const name = document.getElementById("newProductName").value;
    const price = document.getElementById("newProductPrice").value;
    const image = document.getElementById("newProductImage").value;

    db.collection("products").add({
      name: name,
      price: price,
      image: image
    }).then(() => {
      alert("Producto añadido");
      loadProducts();
    });
  }

  // Cargar productos
  function loadProducts() {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    db.collection("products").get().then(snapshot => {
      snapshot.forEach(doc => {
        const product = doc.data();
        container.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}€</p>
          </div>
        `;
      });
    });
  }

  // Auto comprobar login
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById("adminPanel").style.display = "block";
    } else {
      document.getElementById("adminPanel").style.display = "none";
    }
  });

  window.onload = loadProducts;
</script>
