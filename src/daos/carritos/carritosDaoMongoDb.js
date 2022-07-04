import { Contenedor } from "../../contenedores/contenedorMongoDb.js";
import { cartSchema } from "../../types/index.js";

const pass = "develop.flavio";
const url = `mongodb+srv://flavio:${pass}@cluster0.u8vqpio.mongodb.net/?retryWrites=true&w=majority`;

export class CarritoContenedor extends Contenedor {
  constructor() {
    super(url, "carritos", cartSchema);
}
 async addProdsToCart(id, prods){
  await this.model.updateOne({ id: Number(id)},{$push: {productos: prods}}) 
  const cart = await this.model.findOne({id: Number(id)})
  console.log(cart)
  return cart
 }

 async deleteProdFromCart(id, id_prod) {
  await this.model.updateOne({id: Number(id)},{$pull: {productos: {id:id_prod} }})
  const cart = await this.model.find({id: Number(id)})
  return cart
}
}
