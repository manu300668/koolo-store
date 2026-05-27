// FIREBASE CONFIG

const firebaseConfig = {

  apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

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
