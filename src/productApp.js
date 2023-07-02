import ProductManager from "./productManager.js";
import express from "express";


const productManager = new ProductManager();
const app = express();

// Nos transforma la informacion que venga de los query params para poder utilizarla como objeto
app.use(express.urlencoded({extended: true}));

app.get('/productos', async (req, res) => {
    let {limit} = req.query;
    try{
        const productos = await productManager.getProducts()
        if(limit){
            res.send(productos.slice(0,parseInt(limit)))
        } else {
            res.send(productos)
        }
    } catch(e){
        res.status(502).send({error: true});    
    }
})

app.get('/producto/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const productById = await productManager.getProductById(id)
        res.send(productById)
    } catch(e){
        res.status(502).send({error: true});    
    }
})

app.listen(8080, () => console.log(`Escuchando en el puerto 8080`))