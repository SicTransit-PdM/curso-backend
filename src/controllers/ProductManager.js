import Product from "../models/Product.js"
import fs from 'fs/promises'

class ProductManager {
    constructor(path){
        this.path = path
    }
    // MÉTODOS
    async addId(){
        const data = await this.getProducts()
        const lastId = data.length == 0 ? 1 : data[data.length-1].id+1
        console.log('ID: Assigned id =>', lastId)
        return lastId
    }
    async getProducts(){
        const read = await fs.readFile(this.path, 'utf-8')
        const data = (read == '') ? [] : JSON.parse(read)
        return data
    }
    async getProductById(id){
        let data = await this.getProducts()
        let result = data.find(p => p.id == id)
        if(!result){
            console.error(`ERROR: Product not found => id: `, id)
        }
        return result
    }
    async addProduct({title, description, price, category, code, stock, status, thumbnails}){
        console.log('--------------------------')
        console.log(`ADDING "${title}"...`)
        const data = await this.getProducts()
        // Comprobación del código del producto
        let invalidCode = data.some(p => p.code == code)
        console.log(`CHECKING: "${title}" code is valid? =>`, !invalidCode)
        if(invalidCode){
            console.error(`ERROR: A product with "${title}" code already exists.`)
            return 'Ya existe un producto con ese código'
        } else {
            // Comprobación de los campos del producto
            let args = [title, description, price, category, code, stock]
            let invalidArgs = args.includes(undefined) || args.includes('') 
            console.log(`CHECKING: "${title}" has valid fields? =>`, !invalidArgs)
            if(invalidArgs){
                console.error('ERROR: All fields are required.')
                return 'Todos los campos son requeridos'
            } else {
                // Adición del producto a la lista
                const newProduct = new Product(title, description, price, category, code, stock, status, thumbnails)
                newProduct.id = await this.addId()
                data.push(newProduct)
                console.log(`ADDED: "${title}" was added successfully.`)
                await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
                return 'Producto agregado'
            }
        }
    }
    async updateProduct(id, title, description, price, category, code, stock, status, thumbnails){
        console.log('--------------------------')
        console.log('UPDATING ...')
        const data = await this.getProducts()
        let toUpdate = await this.getProductById(id)
        console.log(`CHECKING: Product with "id: ${id}" exists?`, toUpdate ? true : false)
        if (toUpdate){
            console.log(`UPDATING "${toUpdate.title}"`)
            console.log('--------------------------')
            let index = data.findIndex(p => p.id == id)
            toUpdate.title = title ?? toUpdate.title
            toUpdate.description = description ?? toUpdate.description
            toUpdate.price = price ?? toUpdate.price
            toUpdate.category = category ?? toUpdate.category
            toUpdate.code = code ?? toUpdate.code
            toUpdate.stock = stock ?? toUpdate.stock
            toUpdate.status = status ?? toUpdate.status
            toUpdate.thumbnails = thumbnails ?? toUpdate.thumbnails
            data.splice(index, 1, toUpdate)
            console.log(`UPDATED: "${title}" was updated successfully.`)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
            return 'Producto actualizado'
        } else {
            return 'Producto no encontrado'
        }
    }

    async deleteProduct(id){
        console.log('--------------------------')
        console.log('DELETING product => id:', id, '...')
        const data = await this.getProducts()
        const toDelete = await this.getProductById(id)
        console.log(`CHEKING: Product to delete exists? =>`, toDelete ? true : false)
        if (toDelete){
            console.log(`DELETED: Product "${toDelete.title}" was deleted successfully.`)
            let index = data.findIndex(p => p.id == id)
            data.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
            return 'Producto eliminado'
        } else {
            return 'Producto no encontrado'
        }
    }
}

export default ProductManager