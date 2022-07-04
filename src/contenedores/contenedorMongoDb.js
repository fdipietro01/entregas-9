import mongoose from "mongoose";
export class Contenedor {
  constructor(ruta, collection, schema) {
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
    this.asignadorDeId++;
    element.id = this.asignadorDeId;
    element.timestamp = Date().toLocaleString();
    console.log(element)
    try {
      const toAdd = new this.model(element);
      await toAdd.save();
      return element;
    } catch (err) {
      this.asignadorDeId--
      console.log("the err", err);
      return;
    }
  }
  async read(id) {
    if(id){
      const product = await this.model.findOne( { id: Number(id) })
      if (product === null) return 
      return product
    }else{
      const products = await this.model.find()
      return products;
    }

  }

  async update(element, id) {
    await this.model.updateOne(
      { id: Number(id) },
      {
        $set: {
          ...element,
        },
      }
    );
    const updated = this.model.find({ id: Number(id) });
    return updated;
  }

  async delete(id){
    const deleted = await this.model.find({ id: Number(id) })
    await this.model.deleteOne({id: Number(id)})
    return deleted
  }
}
