import express from "express";
import authMiddle from "./authMiddleware.js"
import {instances} from "./daos/index.js";


const {instanceProd} = instances

const routerP = express.Router()

routerP.get("/:id?",async (req, res)=>{
    const id = req.params.id
    const prod_s = await instanceProd.read(id)
    res.send(prod_s? {prods: prod_s}: {Err: "producto inexistente"});
})

routerP.post("/", authMiddle, async(req, res)=>{
    const item = req.body
    const itemChecked= await instanceProd.save(item)
    res.send(itemChecked? {itemAdded:itemChecked}: {Err:"producto no agregado"})
})

routerP.put("/:id", authMiddle, async(req, res)=>{
    const item = req.body
    const id = req.params.id
    const itemChecked = await instanceProd.update(item, id)
    res.send(itemChecked? {itemAdded:itemChecked}: {Err:"producto no actualizado"})
})

routerP.delete("/:id", authMiddle, async(req, res)=>{
    const id = req.params.id
    const itemChecked = await instanceProd.delete(id)
    res.send(itemChecked? {itemAdded:itemChecked}: {Err:"producto no eliminado"})
})

export default routerP
