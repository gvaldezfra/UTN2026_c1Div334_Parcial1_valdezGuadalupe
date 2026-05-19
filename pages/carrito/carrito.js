function obtenerCarrito() {
    /* Obtengo el carrito desde localStorage, lo paso a objecto y lo retorno. Si no
    exsite retorna array vacio */
    let carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}


function cargarProductosCarrito() {
    // Obtener referencia a la tabla del carrito
    let tabla = document.getElementById("tabla-carrito");

    // Cargo el carrito desde localStorage
    let carrito = obtenerCarrito();

    // Sumo el total del carrito
    let totalCarrito = 0;
    carrito.forEach(producto => {
        totalCarrito += producto.precio * producto.cantidad;
    });

    // Recorro el array del carrito e imprimo los datos en la tabla
    carrito.forEach(producto => {
        tabla.innerHTML += `
            <tr class="fila-producto-carrito">
                <td class="celda-producto-tabla-carrito"> ${producto.nombre}</td>
                <td class="celda-producto-tabla-carrito"> ${producto.precio}</td>
                <td class="celda-producto-tabla-carrito"> ${producto.cantidad}</td>
            </tr>`
    });

    totalCarritoPrint = document.getElementById("valor-final");
    totalCarritoPrint.textContent = `El valor final a pagar es de: $${totalCarrito}`;
}

function limpiarCarrito() {
    // Elimino el carrito del localStorage
    localStorage.clear();
    // Limpio la tabla del carrito
    let tabla = document.getElementById("tabla-carrito");
    tabla.innerHTML = `
        <tr class="fila-header-carrito">
            <td class="celda-header-tabla-carrito">Nombre del producto</td>
            <td class="celda-header-tabla-carrito">Cantidad</td>
            <td class="celda-header-tabla-carrito">Precio unitario</td>
        </tr>`;

    // Muestro mensaje de que el carrito fue limpiado
    alert("Carrito limpiado correctamente.");
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});