// 🔹 Inicializa Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
let total = 0;
const summary = document.getElementById("summary");
const totalEl = document.getElementById("total");

// Mostrar resumen y total
cart.forEach(item => {
  total += item.price;
  summary.innerHTML += `<p>${item.name} - ${item.price} €</p>`;
});
totalEl.innerText = total.toFixed(2);

// 🔹 Función de pago con Stripe
async function payWithStripe() {
  const stripe = Stripe("TU_PUBLIC_KEY_STRIPE"); // Reemplaza con tu public key de Stripe
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;

  // Validación
  if(cart.length === 0){
    alert("Tu carrito está vacío");
    return;
  }
  if(!name || !email || !address){
    alert("Completa los campos obligatorios");
    return;
  }

  try {
    // 1️⃣ Guardar pedido en Firebase Firestore
    const orderRef = await db.collection("orders").add({
      customer: {name, email, address, city, phone},
      items: cart,
      total: total,
      status: "Pendiente",
      date: new Date()
    });

    console.log("Pedido guardado con ID:", orderRef.id);

    // 2️⃣ Redirigir a Stripe Payment Link
    // Puedes usar Payment Links o crear Checkout Sessions desde tu backend
    const stripeCheckoutURL = "https://buy.stripe.com/test_xyz"; // Reemplaza con tu enlace de Stripe Checkout
    window.location.href = stripeCheckoutURL;

  } catch (error) {
    console.error("Error al crear el pedido:", error);
    alert("Error al crear el pedido: " + error.message);
  }
}
