// Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
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
