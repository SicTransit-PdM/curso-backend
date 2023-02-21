import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const routerSocket = Router()
const productManager = new ProductManager('src/data/products.JSON')

routerSocket.get('/', async (req, res) => {
    let products = await productManager.getProducts()
    res.render('realTimeProducts', 
    {
        title: 'Products | E-Commerce',
        script: 'js/socketClient.js'
    })
})


export default routerSocket