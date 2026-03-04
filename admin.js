const firebaseConfig = {
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user=>{
  if(!user){
    window.location.href="login.html";
  }
});

function addProduct(){
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  db.collection("products").add({
    name,
    price:Number(price),
    image
  });

  alert("Producto añadido");
}

function loadProducts(){
  db.collection("products").onSnapshot(snapshot=>{
    const container=document.getElementById("adminProducts");
    container.innerHTML="";
    snapshot.forEach(doc=>{
      const product=doc.data();
      container.innerHTML+=`
        <div>
          ${product.name} - €${product.price}
          <button onclick="deleteProduct('${doc.id}')">Eliminar</button>
        </div>
      `;
    });
  });
}

function deleteProduct(id){
  db.collection("products").doc(id).delete();
}

function logout(){
  auth.signOut().then(()=>{
    window.location.href="index.html";
  });
}

loadProducts();
