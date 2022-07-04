
export class Contenedor {
  constructor(ruta, collection) {
    this.ruta = ruta;
    this.asignadorDeId = 0;
    this.collection = collection;
    this.schema = this.schema;
    this.model = mongoose.model(collection, schema);
  }

  async init() {
    try {
      const conection = await mongoose.connect(this.ruta);
      console.log("Mongo is connected");
    } catch (err) {
      console.log("Error on connect", err);
    }
  }

  async save(element) {

  }
  async read(id) {


  }

  async update(element, id) {
 
  }

  async delete(id){

  }
}
