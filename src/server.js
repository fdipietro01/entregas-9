import express from "express";
import routerP from "./routes/routeProducto.js";
import routerC from "./routes/routeCarrito.js";


const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/api/productos", routerP)
app.use("/api/carrito", routerC)


app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});
