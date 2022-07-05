import { Contenedor } from "../../contenedores/contenedorFirebase.js";
import serviceAccount from "../../config/fb/firebaseConfig.json";

const url = "https://ecommercerdb.firebaseio.com";
export class CarritoContenedor extends Contenedor {
  constructor() {
    super(url, serviceAccount, "carritos");
    this.init();
  }

  async addProdsToCart(id, prods) {
    try {
      const docRef = this.query.doc(`${id}`);
      await docRef.update(
        "productos",
        this.admin.firestore.FieldValue.arrayUnion(...prods)
      );
      const cart = await this.read(id);
      return cart
    } catch (err) {
      return;
    }
  }
  async deleteProdFromCart(id, id_prod) {
    try {
      const carto = await this.read(id);
      const toDelete = carto.productos.filter(prod => Number(prod.id) === Number(id_prod))
      if(toDelete === []) return
      const docRef = this.query.doc(`${id}`);
      await docRef.update(
        `productos`,
        this.admin.firestore.FieldValue.arrayRemove(...toDelete)
      );
      const cart = await this.read(id);
      return cart
    } catch (err) {
      return
    }
  }
}
