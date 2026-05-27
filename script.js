// FIREBASE CONFIG

const firebaseConfig = {

apiKey: "TU_API_KEY",
authDomain: "TU_PROYECTO.firebaseapp.com",
projectId: "TU_PROYECTO",
storageBucket: "TU_PROYECTO.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", async () => {

const productosContainer =
document.getElementById("productosContainer");

try {

productosContainer.innerHTML =
"<h2>Buscando productos...</h2>";

const snapshot =
await db.collection("productos").get();

productosContainer.innerHTML = `
<p>Documentos encontrados:
${snapshot.size}</p>
`;

snapshot.forEach(doc => {

productosContainer.innerHTML += `

<div style="
background:white;
padding:20px;
margin:20px;
border:1px solid #ddd;
">

<h2>ID: ${doc.id}</h2>

<pre>
${JSON.stringify(doc.data(), null, 2)}
</pre>

</div>

`;

});

} catch(error){

productosContainer.innerHTML = `

<h2>Error</h2>

<p>${error.message}</p>

`;

}

});
