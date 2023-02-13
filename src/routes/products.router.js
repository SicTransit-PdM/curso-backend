import { Router } from "express"; 
import ProductManager from "../controllers/ProductManager.js";
import generateProducts from "../helpers/generateProducts.js";

const routerProduct = Router()
const productManager = new ProductManager('src/data/products.JSON')

routerProduct.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit)
    let products = await productManager.getProducts()
    if(limit){
        if(limit > 0 && limit <= products.length){
            res.send(products.slice(0, limit))
        } else {
            res.status(400).send('No results found')
        }
    } else {
        res.send(products)
    }
})

routerProduct.get('/:pid', async (req, res) => {
    let id = req.params.pid
    let product = await productManager.getProductById(id)
    res.send(product)
})

routerProduct.post('/', async (req, res) => { 
    let result = await productManager.addProduct(req.body)
    res.send(result)
})

routerProduct.put('/:pid', async (req, res) => { 
    let id = req.params.pid
    let result = await productManager.updateProduct(id, req.body)
    res.send(result)
})

routerProduct.delete('/:pid', async (req, res) => {
    let id = req.params.pid
    let result = await productManager.deleteProduct(id) 
    res.send(result)
})

// GENERADOR DE PRODUCTOS
// routerProduct.put('/', async(req, res) =>{
//     let result = await generateProducts()
//     res.send(result) 
// })

export default routerProduct