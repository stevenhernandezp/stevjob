let carrito = [];
let total = 0;

function abrirCarrito() {
  document.getElementById("modal-carrito").style.display = "flex";
}
function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

function agregarAlCarrito(nombre, precio, imagen) {
  carrito.push({ nombre, precio, imagen });
  total += precio;
  renderizarCarrito();
}

function eliminarProducto(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  renderizarCarrito();
}

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" width="40">
      <span style="color: black;">${item.nombre}</span>
      <strong>$${item.precio.toLocaleString()}</strong>
      <button class="eliminar" onclick="eliminarProducto(${index})">X</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total.toLocaleString();
}

function abrirCheckout() {
  if (carrito.length === 0) {
    alert("⚠️ Tu carrito está vacío. Agrega productos antes de continuar.");
    return;
  }

  document.getElementById("modal-carrito").style.display = "none";
  document.getElementById("modal-checkout").style.display = "flex";
}

function cerrarCheckout() {
  document.getElementById("modal-checkout").style.display = "none";
}

function mostrarCamposPago() {
  const metodo = document.getElementById("pago").value;
  const camposTarjeta = document.getElementById("campos-tarjeta");
  camposTarjeta.style.display = (metodo === "tarjeta") ? "block" : "none";
}

// ✅ Confirmar compra y generar factura
document.getElementById("form-compra").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const pago = document.getElementById("pago").value;

   if (pago === "tarjeta") {
    const numero = document.getElementById("numero").value.trim();
    const expiracion = document.getElementById("expiracion").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!numero || numero.length < 16 || isNaN(numero)) {
      alert("⚠️ Ingresa un número de tarjeta válido (16 dígitos).");
      return;
    }
    if (!expiracion || !/^\d{2}\/\d{2}$/.test(expiracion)) {
      alert("⚠️ Ingresa la fecha de expiración en formato MM/AA.");
      return;
    }
    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
      alert("⚠️ Ingresa un CVV válido (3 dígitos).");
      return;
    }
  }
  let detalles = `
    <p><strong>Cliente:</strong> ${nombre}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Método de pago:</strong> ${pago}</p>
    <h3>Productos:</h3>
    <ul>
  `;

  carrito.forEach(item => {
    detalles += `<li>${item.nombre} - $${item.precio.toLocaleString()}</li>`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  detalles += `</ul><p><strong>Total:</strong> $${total.toLocaleString()}</p>`;

  document.getElementById("detalle-factura").innerHTML = detalles;

  cerrarCheckout();
  document.getElementById("modal-factura").style.display = "flex";
  vaciarCarrito();
});

function cerrarFactura() {
  document.getElementById("modal-factura").style.display = "none";
}

function toggleMenu() {
  document.getElementById("menuLinks").classList.toggle("show");
}
