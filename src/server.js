import express from "express";
import routerP from "./routeProducto.js";
import routerC from "./routeCarrito.js";


const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/api/productos", routerP)
app.use("/api/carrito", routerC)


/* const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);


socketServer.on("connection", (socket) => {
  console.log("nueva conexion")
  socket.emit("launchApp", {
    products: contenedorProductos.getProducts(),
  });

  // listener para añadir producto a la colección y actualizar la tabla
  socket.on("newProduct", (producto) => {
    Productos.addItem(producto);
    socketServer.sockets.emit("updateTable", Productos.getProducts());
  });
}); */
app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});
