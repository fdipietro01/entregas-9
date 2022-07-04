import { Contenedor } from "../../contenedores/contenedorArchivo.js";

export class ProductosContenedor extends Contenedor {
  constructor() {
    super("./productos.txt");
    this.init();
  }
}
