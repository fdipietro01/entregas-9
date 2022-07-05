import { Contenedor } from "../../contenedores/contenedorFirebase.js";
import serviceAccount from "../../config/fb/firebaseConfig.json"

const url = "https://ecommercerdb.firebaseio.com";
export class CarritoContenedor extends Contenedor {
    constructor() {
      super(url, serviceAccount, "carritos");
      this.init()
  }
}