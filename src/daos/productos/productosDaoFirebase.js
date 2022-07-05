import { Contenedor } from "../../contenedores/contenedorFirebase.js";
import serviceAccount from "../../config/fb/firebaseConfig.json"

const url = "https://ecommercerdb.firebaseio.com";
export class ProductosContenedor extends Contenedor {
    constructor() {
      super(url, serviceAccount, "productos");
      this.init()
  }
}