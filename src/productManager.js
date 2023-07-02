import fs from 'fs';

export default class ProductManager{
    constructor(){
        this.path = './db/products.json';
    }

    async #saveProduct(product) {
        await fs.promises.writeFile(this.path, JSON.stringify(product));
        return product;
    }

    async getProducts(){
        try{
            const file = await fs.promises.readFile(this.path, "utf8");
            const products = JSON.parse(file);
            return products;
        } catch {
            return [];
        }
    };

    async getProductById(id){
        const products = await this.getProducts();
        const foundProduct = products.find((item) => item.id == id);
        if (foundProduct){
            return foundProduct;
        } else{
            console.log('Not Found');
        };
    };

    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            const products = await this.getProducts();
            const product = {
                id: products.length+1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            if (products.some((item) => item.code === code)) {
                return console.log('The code already exists!');
            } else {
                products.push(product);
                this.#saveProduct(products);
                return product;
            }
        } catch (error) {
                    console.log(error);
        };
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);
            if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedFields };
            products[index] = updatedProduct;
            await this.#saveProduct(products);
            return updatedProduct;
            } else {
            console.log('Product not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((item) => item.id === id);
            if (index!== -1) {
            products.splice(index, 1);
            await this.#saveProduct(products);
            } else {
            console.log('Product not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

let productos = new ProductManager()

await productos.addProduct('telefono', 'iPhone 11', 1100, 'imagen.png', 'hwASdwa62', 21);
await productos.addProduct('telefono', 'iPhone 12', 1100, 'imagen.png', 'hwASwaddwa62', 21);

// await productos.updateProduct(1, {"title": 'Telefono'})


