import { Router } from "express";
import cartManager from "../cartManager.js";
import productManager from "../productManager.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
    try {
        const result = await cartManager.addCart();
        res.json({message: "carrito agregado"});
    } catch(e) {
        console.log(e);
        res.status(403).json({error: true})
    }
})

cartRouter.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const cartById = await cartManager.getCartById(id)
        if (cartById){
            res.json(cartById)
        }
        else{
            res.status(404).json({error: true})
        }
    } catch (e) {
        console.log(e);
        res.status(403).json({error: true})
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try{
        const {cid, pid} = req.params;
        if (!cartManager.getCartById(cid) && !productManager.getProductById(pid)){
            res.status(404).json({error: true, message: "producto y carrito no encontrados!"})
        }
        else if (!cartManager.getCartById(cid)){
            res.status(404).json({error: true, message: "carrito no encontrado!"})
        }
        else if (!productManager.getProductById(pid)){
            res.status(404).json({error: true, message: "producto no encontrado!"})
        } else {
            const result = await cartManager.addProductInCart(cid, pid)
            res.json({message: "producto añadido"})
        }
    } catch (e) {
        console.log(e);
        res.status(403).json({error: true})
    }
})

export default cartRouter;