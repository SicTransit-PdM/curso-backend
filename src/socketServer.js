import { Server } from 'socket.io'
import ProductManager from './controllers/ProductManager.js'

const productManager = new ProductManager('src/data/products.JSON')
export const configureSocket = (server, namespace) =>{
    const io = new Server(server)
    const nsp = io.of(namespace)

    nsp.on('connection', async (socket) =>{
    console.log('--------------------------------------')
    console.log(`SOCKET: Client connected =>`, namespace)
    socket.emit('getProducts', await productManager.getProducts())

    socket.on('deleteItem', async (id) => {
        console.log('SOCKET: Client request to delete a product received =>', 'id:', id)
        await productManager.deleteProduct(id)
    })

    socket.on('addProduct', async (newProduct) =>{
        console.log('SOCKET: Client request to add a product received \n=>', 'Product:', newProduct)
        await productManager.addProduct(newProduct)
    })

    socket.on('disconnnect', () =>{
        console.log(`SOCKET: Client disconnected from ${namespace}`)
    })
    })
}