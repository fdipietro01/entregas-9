const urlProd = "../daos/productos/productosDao";
const urlCart = "../daos/carritos/carritosDao";


const storages = ["Archivo", "Memoria", "MongoDb", "Firebase"];
const db = process.env.PORT || "Memoria";

let ProductosContenedor;
let CarritoContenedor;

if (storages.includes(db)){
     const importProd = await import(`${urlProd}${db}.js`);
     const importCard = await import(`${urlCart}${db}.js`);
     ProductosContenedor = importProd.ProductosContenedor;
     CarritoContenedor = importCard.CarritoContenedor;
}
    const instanceProd = new ProductosContenedor()
    const instanceCart = new CarritoContenedor()

export const instances = {instanceCart, instanceProd}
