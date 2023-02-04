import ProductManager from './models/ProductManager.js'
import express, { urlencoded } from 'express'

const app = express()
const PORT = 8080
const adm = new ProductManager
app.use(express.urlencoded({extended:true}))

// --------------------------- RUTAS  --------------------------
app.get('/', (req, res) => {
    res.send('Hola, este es mi primer servidor en Node')
})
app.get('/products', async (req, res) => {
    let {limit} = req.query
    console.log(await adm.getProducts())
    const response = limit ? (await adm.getProducts()).slice(0, parseInt(limit)) : await adm.getProducts()
    res.send(response)
})
app.get('/products/:pid', async (req, res) => {
    const id = req.params.pid
    res.send(await adm.getProductById(id))
})

// -------------------- EJECUCIÓN DEL SERVIDOR -------------------

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// const generateProducts = async () => {
    
//     await adm.addProduct('Campera 1', 'Color azul', 16400, 'thumbnail-link', '1241359301', 23)
//     await adm.addProduct('Campera 2', 'Color negro', 16400, 'thumbnail-link', '124135163', 15)
//     await adm.addProduct('Campera 3', 'Color blanco', 16400, 'thumbnail-link', '12413511523', 12)
//     await adm.addProduct('Remera 1', 'Color negro', 4500, 'thumbnail-link', '4918274987', 22)
//     await adm.addProduct('Remera 2', 'Color rojo', 4500, 'thumbnail-link', '4918274125', 21)
//     await adm.addProduct('Remera 3', 'Color azul', 4500, 'thumbnail-link', '4918274235', 28)
//     await adm.addProduct('Pantalon 1', 'Color azul', 2500, 'thumbnail-link', '346345431', 14)
//     await adm.addProduct('Pantalon 2', 'Color negro', 2500, 'thumbnail-link', '3463412451', 20)
//     await adm.addProduct('Pantalon 3', 'Color blanco', 2500, 'thumbnail-link', '346345354', 16)
//     await adm.addProduct('Zapatillas 1', 'Color negro', 21000, 'thumbnail-link', '3525392835', 10)
// }
//generateProducts()