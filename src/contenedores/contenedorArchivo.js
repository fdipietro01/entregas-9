import { promises as fs } from "fs";
export class Contenedor {
  constructor(ruta) {
    this.ruta = ruta
    this.asignadorDeId = 0;
  }

  async init () {
    await fs.writeFile(this.ruta, JSON.stringify([]));
  }

  async save (element) {
    try{
    const elements = JSON.parse(await fs.readFile(this.ruta))
    this.asignadorDeId ++
    !element.id && (element.id = this.asignadorDeId)
    element.timestamp = Date().toLocaleString()
    elements.push(element)
    await fs.writeFile(this.ruta, JSON.stringify(elements));
    return element;
    }
    catch(err){
      this.asignadorDeId--
      return;
    }
  }

  async read(id) {
    const element = JSON.parse(await fs.readFile(this.ruta))
    return id? element.find(el => el.id === Number(id)):element
 } 
 
 async update(element, id){
    const elements = JSON.parse(await fs.readFile(this.ruta))
    const index = elements.findIndex(el => el.id === Number(id))
    if (index === -1) return;
    const newElement = {...element, id:Number(id), timestamp: elements[index].timestamp}
    elements.splice(index, 1, newElement)
    await fs.writeFile(this.ruta, JSON.stringify(elements));
    return newElement;
 }

 async delete(id){
    const elements = JSON.parse(await fs.readFile(this.ruta))
    const index = elements.findIndex(el => el.id === Number(id))
    const item = elements[index]
    if (index === -1) return;
    elements.splice(index, 1)
    await fs.writeFile(this.ruta, JSON.stringify(elements));
    return item
 }
}
