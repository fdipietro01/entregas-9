import { Contenedor } from "../../contenedores/contenedorArchivo.js";

export class CarritoContenedor extends Contenedor {
  constructor() {
    super("./carrito.txt");
    this.init()
  }

  async addProdsToCart(id, elements) {
    const carrito = await this.read(id);
    if (carrito === undefined || carrito.length !== undefined) return;
    elements.forEach((element) => {
      const itemExistente = carrito.productos.find((p) => p.id === elements.id);
      !itemExistente && carrito.productos.push(element); //evita agregar items repetidos
    });
    await this.update(carrito, id);
    return carrito;
  }

  async deleteProdFromCart(id, id_prod) {
    const carrito = await this.read(id);
    if (carrito === undefined || carrito.length !== undefined) return;
    const index = carrito.productos.findIndex((p) => p.id === Number(id_prod));
    if (index ===-1) return
    carrito.productos.splice(index, 1)
    await this.update(carrito, id)
    return carrito
  }
}
