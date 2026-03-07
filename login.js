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
const auth = firebase.auth();
const db = firebase.firestore();

function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email,password)
    .then(()=>{ window.location="index.html"; })
    .catch(err=>alert(err.message));
}

function register(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email,password)
    .then(user=>{
      db.collection("usuarios").doc(user.user.uid).set({email});
      alert("Usuario registrado"); 
      window.location="index.html";
    })
    .catch(err=>alert(err.message));
}
