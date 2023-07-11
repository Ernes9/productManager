import express from "express";
import productsRouter from "./routes/productos.js";
import cartRouter from "./routes/carts.js"

const app = express();

// Nos transforma la informacion que venga de los query params para poder utilizarla como objeto
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/productos", productsRouter)
app.use("/api/cart", cartRouter)


app.listen(8080, () => console.log(`Escuchando en el puerto 8080`))