import { Contenedor } from "../../contenedores/contenedorMongoDb.js";
import { prodSchema } from "../../types/index.js";
import { url } from "../../config/mongo/index.js";



export class ProductosContenedor extends Contenedor {
  constructor() {
    super(url, "productos", prodSchema);
    this.init();
  }
}
