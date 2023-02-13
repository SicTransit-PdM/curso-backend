import ProductManager from "../controllers/ProductManager.js"

const generateProducts = async () => {
    const adm = new ProductManager('src/data/products.JSON')
    
    await adm.addProduct({title: 'Campera 1', description: 'Color azul', price: 16400, category: 'Indumentaria', code: '1241359301', stock: 23, status: true})
    await adm.addProduct({title: 'Campera 2', description: 'Color negro', price: 16400, category: 'Indumentaria', code: '124135163', stock: 15, status: true})
    await adm.addProduct({title: 'Campera 3', description: 'Color blanco', price: 16400, category: 'Indumentaria', code: '12413511523', stock: 12, status: true})
    await adm.addProduct({title: 'Remera 1', description: 'Color negro', price: 4500, category: 'Indumentaria', code: '4918274987', stock: 22, status: true})
    await adm.addProduct({title: 'Remera 2', description: 'Color rojo', price: 4500, category: 'Indumentaria', code: '4918274125', stock: 21, status: true})
    await adm.addProduct({title: 'Remera 3', description: 'Color azul', price: 4500, category: 'Indumentaria', code: '4918274235', stock: 28, status: true})
    await adm.addProduct({title: 'Pantalon 1', description: 'Color azul', price: 2500, category: 'Indumentaria', code: '346345431', stock: 14, status: true})
    await adm.addProduct({title: 'Pantalon 2', description: 'Color negro', price: 2500, category: 'Indumentaria', code: '3463412451', stock: 20, status: true})
    await adm.addProduct({title: 'Pantalon 3', description: 'Color blanco', price: 2500, category: 'Indumentaria', code: '346345354', stock: 16, status: true})
    await adm.deleteProduct(9)
    await adm.addProduct({title: 'Zapatillas 1', description: 'Color negro', price: 21000, category: 'Indumentaria', code: '3525392835', stock: 10, status: true})
    await adm.addProduct({title: 'Samsung A53 con fotos', description: 'Color negro', price: 147000, category: 'Tecnologia', code: '1298371521', stock: 12, status: true, thumbnails: [
        'https://images.samsung.com/is/image/samsung/p6pim/ar/2202/gallery/ar-galaxy-a53-5g-a536-sm-a536ezkaaro-531544682?$1300_1038_PNG$',
        'https://images.samsung.com/is/image/samsung/p6pim/ar/2202/gallery/ar-galaxy-a53-5g-a536-sm-a536ezkaaro-531544669?$684_547_PNG$',
        'https://images.samsung.com/is/image/samsung/p6pim/ar/2202/gallery/ar-galaxy-a53-5g-a536-sm-a536ezkaaro-531544665?$684_547_PNG$'
    ]})
    return JSON.stringify(await adm.getProducts())
}

export default generateProducts