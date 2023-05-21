class Juego {
    articulo
    cantidad

    constructor(articulo, cantidad) {
        this.articulo = articulo
        this.cantidad = cantidad
    }

    totalCarrito() {
        return this.cantidad * this.articulo.precio
    }
}



