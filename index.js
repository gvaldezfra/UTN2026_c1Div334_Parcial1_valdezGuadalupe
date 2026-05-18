//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{   //Busco el carrito en el LocalStorage
    const carritoObtenido = localStorage.getItem("carrito");
    //Si existe, retorna carrito parseado a array, sino retorna array vacío
    return carritoObtenido ? JSON.parse(carritoObtenido) : [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    // Guardado en localStorage con la clave "carrito"
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    // Busco el nombre y precio navegando desde el padre <li>
    let nombreProducto = elementoClickeado.parentElement.querySelector(".nombre-producto").textContent;
    let precioProducto = elementoClickeado.parentElement.querySelector(".precio-producto").textContent;

    //Busco el carrito actual en el localStorage
    let carritoActual = obtenerCarrito();

    //Busco si el producto ya existe en el carrito
    let productoExistente = carritoActual.find(prod => prod.nombre === nombreProducto);
    if (productoExistente) {
        // Si ya existía, aumento la cantidad en 1
        productoExistente.cantidad += 1;
    } else {
        // Si no existía, creo un nuevo producto en el carrito con cantidad 1
        let producto = {
            nombre: nombreProducto,
            precio: Number(precioProducto.replace("$", "")), // Convierto el precio de string a número
            cantidad: 1
        };
        carritoActual.push(producto);
    }

    //Muestro mensaje cuando se agrega un producto al carrito
    alert(`Un/una: ${nombreProducto} fue agregado al carrito.`);

    //Imprimo en consola el carrito antes de guardarlo
    console.log("Carrito antes de guardar:", carritoActual);

    //Guardo el carrito actualizado en el localStorage
    guardarCarrito(carritoActual);
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    // Busco el nombre del producto navegando desde el padre <li>
    let nombreProducto = elementoClickeado.parentElement.querySelector(".nombre-producto").textContent;

    //Busco el carrito actual en el localStorage
    let carritoActual = obtenerCarrito();

    //Compruebo que el carrito no esté vacío
    if (carritoActual.length === 0) {
        alert("No hay productos guardados en el carrito.");
        return;
    }

    //Busco el producto en el carrito
    let productoExistente = carritoActual.find(prod => prod.nombre === nombreProducto);
    if (productoExistente) {
        // Si existe, disminuyo la cantidad en 1
        productoExistente.cantidad -= 1;
        // Si la cantidad llega a 0 o menos, lo elimino del carrito
        if (productoExistente.cantidad <= 0) {
            carritoActual = carritoActual.filter(prod => prod.nombre !== nombreProducto);
        }
        //Muestro mensaje cuando se resta un producto del carrito
        alert(`Un/una: ${nombreProducto} fue eliminado del carrito.`);
    } else {
        // Si no existía, muestro un mensaje de que no hay mas de ese producto
        alert(`No hay más ${nombreProducto} en el carrito.`);
        return;
    }

    //Imprimo en consola el carrito antes de guardarlo
    console.log("Carrito antes de guardar:", carritoActual);

    //Guardo el carrito actualizado en el localStorage
    guardarCarrito(carritoActual);

}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
