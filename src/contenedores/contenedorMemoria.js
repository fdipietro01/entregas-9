export class Contenedor {
  constructor(ruta) {
    this.asignadorDeId = 0;
    this.memoria = [];
  }

  async init () {
    console.log("Contenedor iniciado")
  }

  async save (element) {
    this.asignadorDeId ++
    const newElement = {...element, id:this.asignadorDeId, timestamp: Date().toLocaleString()}
    this.memoria.push(newElement)
    return newElement;
  }

  async read(id) {
    const element = this.memoria.find(prod=>prod.id === Number(id))
    return element ? element : this.memoria;
 } 
 
 async update(element, id){
    const index = this.memoria.findIndex(el => el.id === Number(id))
    if (index === -1) return;
    const newElement = {...element, id:Number(id), timestamp: this.memoria[index].timestamp}
    this.memoria.splice(index, 1, newElement)
    return newElement;
 }

 async delete(id){
    const index = this.memoria.findIndex(el => el.id === Number(id))
    const item = this.memoria[index]
    if (index === -1) return;
    this.memoria.splice(index, 1)
    return item
 }
}
