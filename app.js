// Variables vacías para almacenar los juegos del carrito del usuario y de mi catálogo
let carrito = []
let catalogo = []

// Elementos que llamo del DOM
const gameList = document.getElementById("tJuegos")
const seleccion = document.getElementById("selector")
const btnAgregar = document.getElementById("btn-agregar")
const btnVaciar = document.getElementById("btn-vaciar")
const totalCarrito = document.getElementById("total")

// Productos que creé y metí en el catálogo de mi tienda
catalogo.push(new Articulo("https://i.ibb.co/ZSKJ2kX/product-001.webp", "Elden Ring", "PS4", 45000, "2022"))
catalogo.push(new Articulo("https://i.ibb.co/9VPmHvf/product-002.webp", "The Last of Us: Part II", "PS4", 40000, "2020"))
catalogo.push(new Articulo("https://i.ibb.co/sPXZKPJ/product-003.webp", "Horizon: Forbidden West", "PS4", 45000, "2022"))
catalogo.push(new Articulo("https://i.ibb.co/zJq5jtb/product-004.webp", "Zelda: Breath of The Wild", "Switch", 45000, "2022"))
catalogo.push(new Articulo("https://i.ibb.co/L0ZpLMV/product-005.webp", "Mario Kart 8", "Switch", 35000, "2014"))
catalogo.push(new Articulo("https://i.ibb.co/gMV3wYY/product-006.webp", "Tomb Raider", "Xbox", 30000, "2013"))
catalogo.push(new Articulo("https://i.ibb.co/WBJfNjD/product-007.webp", "It Takes Two", "Xbox", 40000, "2021"))
catalogo.push(new Articulo("https://i.ibb.co/FVmhDPY/product-008.webp", "The Elder Scrolls V: Skyrim", "PS4", 35000, "2011"))

// Con esta función guardo mi catálogo en el storage local del navegador
localStorage.setItem("catalogo", JSON.stringify(catalogo))

// Incluyo la función para asignar los eventos para cargar los juegos al inicio, agregar al carrito y vaciar al hacer clic
allEventListeners()

function allEventListeners() {
    window.addEventListener("DOMContentLoaded", cargarJuegos)
    btnAgregar.addEventListener("click", manejoSubmit)
    btnVaciar.addEventListener("click", vaciar)
}

// Esta función carga los juegos del catálogo y carrito del storage con ayuda del JSON.parse y actualiza el carrito (Asociada al Listener "DOMContentLoaded" de window)
function cargarJuegos() {
    catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    llenarSelect();
    actualizarCarrito();
    if (!carrito.length) {
        btnVaciar.setAttribute("disabled", true);
    }
}

// Función para llenar el selector con los juegos disponibles de mi catálogo
function llenarSelect() {
    catalogo.forEach((articulo, index) => {
        const opcion = document.createElement("option");
        opcion.textContent = `${articulo.plataforma} | ${articulo.nombre} | $${articulo.precio}`;
        opcion.value = index;
        seleccion.appendChild(opcion);
    });
}

// Función para agregar los juegos al carrito (Asociada al Listener "click" de btnAgregar)
function manejoSubmit(e) {
    e.preventDefault();
    const juegoSeleccionado = catalogo[+seleccion.value];
    const item = new Juego(juegoSeleccionado, 1);
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    crearFila(item);
}

// Función que actualiza la tabla con los juegos añadidos al carrito. Si el carrito no tiene juegos, se deshabilita el botón de vaciar
function actualizarCarrito() {
    gameList.innerHTML = "";
    totalCarrito.innerText = 0;
    carrito.length || btnVaciar.setAttribute("disabled", true);
    carrito.forEach((juego) => {
        crearFila(juego);
    });
}

// Función para vaciar el carrito (Asociada al Listener "click" de btnVaciar)
function vaciar() {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito()
}

// Acá van los elementos y funciones de mi tabla (creación de filas y datos con la info de mis clases)
function crearFila(juego) {
    const fila = document.createElement("tr")
    let td = document.createElement("td")
    const posCarrito = carrito.indexOf(juego)

    const cover = document.createElement("img")
    cover.src = getCoverRuta(juego.articulo) // Para incluir la imagen de portada
    cover.alt = `Cover de ${juego.articulo.nombre}`
    cover.classList.add("imgCover")  // Para reducir el tamaño de la img
    td = document.createElement("td")
    td.appendChild(cover)
    fila.appendChild(td)

    td = document.createElement("td")
    td.textContent = juego.articulo.plataforma // Obtener el tipo de plataforma
    fila.appendChild(td)

    td = document.createElement("td")
    td.textContent = juego.articulo.nombre // Obtener el nombre
    fila.appendChild(td)

    td = document.createElement("td")
    td.textContent = juego.articulo.anio // Obtener el año
    fila.appendChild(td)

    td = document.createElement("td")
    td.textContent = juego.articulo.precio // Obtener el precio
    fila.appendChild(td)

    // Creación del botón dentro de la tabla para eliminar juegos del carrito con el evento "onclick" y actualizar
    const btnEliminar = document.createElement("button")
    btnEliminar.className = "btn btn-danger"
    btnEliminar.textContent = "Eliminar"

    btnEliminar.onclick = () => {
        carrito.splice(posCarrito, 1)
        actualizarCarrito()
        localStorage.setItem("carrito", JSON.stringify(carrito))
    };

    td = document.createElement("td")
    td.appendChild(btnEliminar)
    fila.appendChild(td)
    gameList.appendChild(fila)
    btnVaciar.removeAttribute("disabled") // Habilito la opción de vaciar el carrito, removiendo el "disabled"

    // Función para calcular el total del carrito
    totalCarrito.innerText = carrito.reduce(
        (acumulador, juego) => acumulador + juego.articulo.precio * juego.cantidad,
        0
    )
}

// Función para retornar la url de las img para los covers de cada juego
function getCoverRuta(articulo) {
    return articulo.cover;
}

