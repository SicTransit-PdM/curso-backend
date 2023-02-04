import Product from "./Product.js"
import fs from 'fs/promises'

class ProductManager {
    constructor(){
        this.path = './src/data/products.JSON'
    }
    // MÉTODOS
    async getProducts(){
        const read = await fs.readFile(this.path, 'utf-8')
        const data = (read == '') ? [] : JSON.parse(read)
        return data
    }
    async getProductById(id){
        let data = await this.getProducts()
        let result = data.find(p => p.id == id) ?? console.log(`No results found matching "ID: ${id}"`)
        return result
    }
    async addProduct(title, description, price, thumbnail, code, stock){
        console.log('--------------------------')
        console.log(`CHECKING "${title}":`)
        const data = await this.getProducts()
        // Comprobación del código del producto
        let invalidCode = data.some(p => p.code == code)
        console.log(`"${title}" code is invalid? =>`, invalidCode)
        if(invalidCode){
            return console.error(`ERROR: "${title}" is already added to the list.`)
        } else {
            // Comprobación de los campos del producto
            let invalidArgs = Array.from(arguments).includes(undefined) || Array.from(arguments).length != 6 || Array.from(arguments).includes('')
            console.log(`"${title}" has invalid fields? =>`, invalidArgs)
            if(invalidArgs){
                return console.error('ERROR: All fields are required')
            } else {
                // Adición del producto a la lista
                data.push(new Product(title, description, price, thumbnail, code, stock))
                console.log(`"${title}" was added to the list`)
                await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
                }
        }
    }
    async updateProduct(id, title, description, price, thumbnail, code, stock){
        const data = await this.getProducts()
        let toUpdate = await this.getProductById(id)
        if (toUpdate){
            console.log('--------------------------')
            console.log(`UPDATED "${toUpdate.title}"`)
            let index = data.findIndex(p => p.id == id)
            toUpdate.title = title ?? toUpdate.title
            toUpdate.description = description ?? toUpdate.description
            toUpdate.price = price ?? toUpdate.price
            toUpdate.thumbnail = thumbnail ?? toUpdate.thumbnail
            toUpdate.code = code ?? toUpdate.code
            toUpdate.stock = stock ?? toUpdate.stock
            data.splice(index, 1, toUpdate)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
        } else {
            return console.error('ERROR: No data matches to update found')
        }
    }

    async deleteProduct(id){
        const data = await this.getProducts()
        const toDelete = await this.getProductById(id)
        if (toDelete){
            console.log('--------------------------')
            console.log(`DELETED "${toDelete.title}"`)
            let index = data.findIndex(p => p.id == id)
            data.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
        }
    }
}

export default ProductManager