// Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo.es",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Agregar producto con imagen
function agregarProducto(){
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const file = document.getElementById("imagenFile").files[0];

  if(file){
    const storageRef = storage.ref('productos/'+file.name);
    storageRef.put(file).then(()=>{
      storageRef.getDownloadURL().then(url=>{
        db.collection("productos").add({nombre, precio, imagen: url})
          .then(()=> alert("Producto agregado con imagen"));
      });
    });
  } else {
    const url = document.getElementById("imagen").value;
    db.collection("productos").add({nombre, precio, imagen: url})
      .then(()=> alert("Producto agregado"));
  }
}

// Guardar configuración web
function guardarConfig(){
  db.collection("config").doc("web").set({
    titulo: document.getElementById("titulo").value,
    subtitulo: document.getElementById("subtitulo").value,
    logo: document.getElementById("logo").value,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    tiktok: document.getElementById("tiktok").value
  }).then(()=> alert("Configuración guardada"));
}
