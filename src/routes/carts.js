import { Router } from "express";
import cartManager from "../cartManager.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
    try {
        const result = cartManager.addCart();
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
        res.json(cartById)
    } catch (e) {
        console.log(e);
        res.status(403).json({error: true})
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try{
        const {cid, pid} = req.params;
        const result = cartManager.addProductInCart(cid, pid)
        res.json({message: "producto añadido"})
    } catch (e) {
        console.log(e);
        res.status(403).json({error: true})
    }
})

export default cartRouter;