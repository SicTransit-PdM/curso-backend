class Product {
    constructor(title, description, price, category, code, stock, status = true, thumbnails = []) {
        this.title = title
        this.description = description
        this.price = price
        this.category = category
        this.code = code
        this.stock = stock
        this.status = status
        this.thumbnails = thumbnails
    }
}


export default Product