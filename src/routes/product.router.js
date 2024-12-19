import { Router } from "express";
const router = Router()

//? importo productManager

//*con common js
// const ProductManager = require("../managers/product-manager.js")

//*con ESmodules
import ProductManager from "../managers/product-manager.js";
const manager = new ProductManager("./src/data/productos.json")

//! ruta para listar todos los productos
router.get("/", async (req,res)=>{
    //*guardo el query limit
    let limit = req.query.limit;
    
    const productos = await manager.getProducts()

    if(limit){
        res.send(productos.slice(0, limit))
    } else{
        res.send(productos)
    }
})

//! ruta para retornar todos los productos por id
router.get("/products/:pid", async (req,res)=>{
    let id = req.params.pid
    const productoBuscado = await manager.getProductById(parseInt(id))
    res.send(productoBuscado)
})

export default router