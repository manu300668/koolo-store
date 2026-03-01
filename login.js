// Config Firebase
const firebaseConfig = {
  apiKey: "AQUI_VA_TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login
function loginAdmin(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!email || !password) return alert("Ingrese email y contraseña");

  auth.signInWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      window.location.href = "admin.html";
    })
    .catch((error)=>{
      document.getElementById("loginMessage").innerText = "Error: "+error.message;
    });
}

// Detectar estado de sesión para index.html
auth.onAuthStateChanged(user=>{
  const adminBtn = document.querySelector(".admin-btn");
  if(adminBtn){
    if(user){
      adminBtn.style.display="inline-block";
    } else {
      adminBtn.style.display="none";
    }
  }
});
