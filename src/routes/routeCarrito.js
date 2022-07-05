import express from "express";
import {instances} from "../daos/index.js";


const {instanceCart} = instances

const routerC = express.Router()

routerC.post("/", async(req, res)=>{
    const cart = req.body
    const itemChecked= await instanceCart.save(cart)
    res.send(itemChecked? {cartAdded:itemChecked}: {Err:"carrito no agregado"})
})

routerC.delete("/:id", async(req, res)=>{
    const id = req.params.id
    const itemChecked = await instanceCart.delete(id)
    res.send(itemChecked? {itemDeleted:itemChecked}: {Err:"carrito no eliminado"})
})

routerC.get("/:id/productos",async (req, res)=>{
    const id = req.params.id
    const cart = await instanceCart.read(id)
    res.send(cart? {productos: cart.productos}: {Err: "carrito inexistente"});
})

routerC.post("/:id/productos",async (req, res)=>{
    const id = req.params.id
    const prods = req.body
    const newCart = await instanceCart.addProdsToCart(id, prods)
    res.send(newCart? {cart: newCart}: {Err: "productos en carrito no agregados"});
})

routerC.delete("/:id/productos/:id_prod", async(req, res)=>{
    const {id, id_prod} = req.params
    const itemDeleted = await instanceCart.deleteProdFromCart(id, id_prod)
    res.send(itemDeleted? {itemDeleted}: {Err:"producto de carrito no eliminado"})
})


export default routerC
