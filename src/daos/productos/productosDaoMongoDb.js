import { Contenedor } from "../../contenedores/contenedorMongoDb.js";
import { prodSchema } from "../../types/index.js";

const pass = "develop.flavio";
const url = `mongodb+srv://flavio:${pass}@cluster0.u8vqpio.mongodb.net/?retryWrites=true&w=majority`;

export class ProductosContenedor extends Contenedor {
  constructor() {
    super(url, "productos", prodSchema);
    this.init();
  }
}
