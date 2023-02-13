import express from 'express'
import { uploader } from './utils.js'
import { __dirname } from './path.js'
import routerProduct from './routes/products.router.js'
import routerCart from './routes/carts.router.js'
import * as path from 'path'


const app = express()
const PORT = 8080

// --------------------------- MIDDLEWARES --------------------

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// --------------------------- RUTAS  --------------------------
app.use('/static', express.static(path.join(__dirname, '..', '/public')))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.post('/upload', uploader.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send({status:'error', error: "ERROR: Couldn't upload file"})
    }
    console.log(req.file)
    res.send('Image uploaded')
})

app.get('/', (req, res) => {
    res.send('root')
})

// -------------------- EJECUCIÓN DEL SERVIDOR -------------------

app.listen(PORT, () => {
    console.log('--------------------------------------')
    console.log(`Server on port ${PORT}`)
})