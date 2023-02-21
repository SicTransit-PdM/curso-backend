import * as path from 'path'
import express from 'express'
import { uploader, __dirname } from './utils.js'
import { configureSocket } from './socketServer.js'
import { engine } from 'express-handlebars'
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import routerSocket from './routes/realTimeProducts.routes.js'

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('--------------------------------------')
    console.log(`SERVER: Server on port =>`, PORT)
})

// --------------------------- MIDDLEWARES --------------------

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

// --------------------------- SOCKET IO --------------------

configureSocket(server, '/realtimeproducts')

// --------------------------- RUTAS  --------------------------

app.use('/', express.static(path.join(__dirname, '..', '/public')))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.use('/realtimeproducts', routerSocket)
app.post('/upload', uploader.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send({status:'error', error: "ERROR: Couldn't upload file"})
    }
    console.log(req.file)
    res.send('Image uploaded')
})

// --------------------------- HANDLEBARS  --------------------------

app.get('/', (req, res) => {
    res.render('index', {
        title: 'E-Commerce',
        user: ''
    })
})