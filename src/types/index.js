import mongoose from "mongoose";

export const prodSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: {type: Date, require: true},
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    codigo: { type: String, require: true },
    foto: { type: String, require: true },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
  });

export const cartSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: {type: Date, require: true},
    productos: {type: [prodSchema]}


})