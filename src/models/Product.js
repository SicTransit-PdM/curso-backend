class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.addId()
    }
    static addId(){
        if(this.idIncremental){
            this.idIncremental++
        } else {
            this.idIncremental = 1
        }
        return this.idIncremental
    }
}

export default Product