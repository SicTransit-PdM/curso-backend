import { Router } from "express"; 
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const routerCart = Router()
const cartManager = new CartManager(`src/data/carts.JSON`)
const productManager = new ProductManager(`src/data/products.JSON`)

routerCart.get('/', async (req, res) => {
    let carts = await cartManager.getCarts()
    res.send(carts)
})

routerCart.get('/:cid', async (req, res) =>{
    let id = req.params.cid
    let cart = await cartManager.getCartById(id)
    res.send(cart)
})

routerCart.post('/', async (req, res) => {
    let result = await cartManager.addCart([])
    res.send(result)
})

routerCart.delete('/:cid', async (req, res) => {
    let id = req.params.cid
    let mensaje = await cartManager.deleteCart(id) 
    res.send(mensaje)
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let product = await productManager.getProductById(pid)
    let result = await cartManager.addProductToCart(cid, product)
    res.send(result)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let product = await productManager.getProductById(pid)
    let result = await cartManager.deleteProductFromCart(cid, product)
    res.send(result)
})

export default routerCart