import { Router } from "express";
import productManager from "../productManager.js";


const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    let {limit} = req.query;
    try{
        const productos = await productManager.getProducts()
        if (productos.length === 0) {
            res.status(404).json({ error: 'No se encontraron productos' });
        } else { 
            if(limit){
                res.json(productos.slice(0,parseInt(limit)))
            } else {
                res.json(productos)
            }
        }
    } catch(e){
        res.status(502).json({error: true});    
    }
})

productsRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        try{
            const productById = await productManager.getProductById(id)
            res.json(productById)
        } catch {
            res.status(404).json({error: true})
        }
    } catch(e){
        res.status(502).json({error: true});    
    }
})

productsRouter.post("/", async (req, res) => {
    const body = req.body;
    try{
        const result = await productManager.addProduct(body);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.status(502).json({error: true})
    }
})

productsRouter.delete("/:id", async (req, res) => {
    const {id} = req.query;
    if (await productManager.getProductById(id)) {
        try {
            await productManager.deleteProduct(id);
            res.json({deleted: true});
        } catch(e) {
            console.log(e);
            res.status(502).json({error: true});
        }
    }
    else{
        res.status(404).json({error:true})
    }
})

productsRouter.put("/:id", async (req, res) => {
    const body = req.body;
    try {
        const result = await productManager.updateProduct(body);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.status(502).json({error: true})
    }
})

export default productsRouter;