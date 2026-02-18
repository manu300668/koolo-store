// ===== VARIABLES =====
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
let cart = [];

// Login
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginSubmit = document.getElementById('loginSubmit');

// Admin
const adminPanel = document.getElementById('adminPanel');
const adminPassword = "MiPasswordSegura123"; // Cambia esta contraseña

// Toast
function showToast(message){
    let toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.remove();
    }, 2000);
}

// ===== EVENTOS CARRITO =====
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCart();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

function renderCart(){
    cartItems.innerHTML = '';
    if(cart.length === 0){
        cartItems.innerHTML = '<li>Carrito vacío</li>';
        return;
    }
    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.name} - ${item.price}€ x ${item.qty}`;
        cartItems.appendChild(li);
    });
    updateCartBtn();
}

function updateCartBtn(){
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBtn.innerText = `🛒 ${totalQty}`;
}

// ===== AÑADIR PRODUCTOS =====
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        let productDiv = e.target.closest('.product');
        let name = productDiv.querySelector('h2').innerText;
        let price = parseFloat(productDiv.querySelector('p').innerText.replace('€',''));
        let existing = cart.find(i => i.name === name);
        if(existing){
            existing.qty +=1;
        } else {
            cart.push({name, price, qty:1});
        }
        showToast(`${name} añadido al carrito`);
        renderCart();
    });
});

// ===== LOGIN =====
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

loginSubmit.addEventListener('click', () => {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    if(user === "admin" && pass === adminPassword){
        alert("Bienvenido Admin");
        adminPanel.classList.remove('hidden');
        loginModal.style.display = 'none';
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// ===== CIERRE MODALES AL HACER CLICK FUERA =====
window.addEventListener('click', (e) => {
    if(e.target === loginModal) loginModal.style.display = 'none';
    if(e.target === cartModal) cartModal.style.display = 'none';
});

// ===== CHECKOUT PAYPAL =====
const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        alert("El carrito está vacío");
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    alert(`Total: ${total}€. Redirigiendo a PayPal Sandbox...`);
    // Redirigir a PayPal Sandbox (ejemplo)
    window.open('https://www.sandbox.paypal.com/checkout', '_blank');
});
