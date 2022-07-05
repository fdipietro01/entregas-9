const urlProd = "../daos/productos/productosDao";
const urlCart = "../daos/carritos/carritosDao";

const a = "Firebase" //este seria el valor del .env
const storages = ["Archivo", "Memory", "MongoDb", "Firebase"];


let ProductosContenedor;
let CarritoContenedor;

if (storages.includes(a)){
     const importProd = await import(`${urlProd}${a}.js`);
     const importCard = await import(`${urlCart}${a}.js`);
     ProductosContenedor = importProd.ProductosContenedor;
     CarritoContenedor = importCard.CarritoContenedor;
}
    const instanceProd = new ProductosContenedor()
    const instanceCart = new CarritoContenedor()

export const instances = {instanceCart, instanceProd}
