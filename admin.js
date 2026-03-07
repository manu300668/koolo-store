const db = firebase.firestore();

////////////////////////////////////////////////
// CREAR PRODUCTO
////////////////////////////////////////////////

function addProduct(){

let name=document.getElementById("name").value;
let price=document.getElementById("price").value;
let image=document.getElementById("image").value;

db.collection("products").add({

name,
price,
image

})

.then(()=>{

alert("Producto creado");

});

}

////////////////////////////////////////////////
// CONFIGURACIÓN
////////////////////////////////////////////////

function saveSettings(){

let instagram=document.getElementById("instagram").value;
let tiktok=document.getElementById("tiktok").value;
let twitter=document.getElementById("twitter").value;

db.collection("settings").doc("store").set({

instagram,
tiktok,
twitter

})

.then(()=>{

alert("Configuración guardada");

});

}
