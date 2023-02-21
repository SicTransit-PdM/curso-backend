const socket = io('/realtimeproducts')
const itemListContainer = document.getElementById('itemListContainer')
const addForm = document.getElementById('addProductForm')

addForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const newProduct = Object.fromEntries(formData)
    if(!Object.values(newProduct).includes('')){
        console.log('SOCKET: Request to add a product sent to server =>', newProduct)
        //newProduct.thumbnails = []
        //newProduct.status = true
        socket.emit('addProduct', newProduct)
        addForm.reset()
        Swal.fire({
            title: 'Success',
            text: `"${newProduct.title}" has been added successfully`,
            icon: 'success',
            confirmButtonColor: '#1a1a1a',
            customClass: {
                confirmButton: 'btn btn-success rounded-pill'
            }
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: `All fields are required`,
            icon: 'error',
            confirmButtonColor: '#1a1a1a',
            customClass: {
                confirmButton: 'btn rounded-pill'
            }
        })
    }
})

const handleDelete = (title, id) =>{
    Swal.fire({
        title: 'Warning',
        text: `Are you sure you want to delete "${title}"? (You won't be able to revert this!)`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#1a1a1a',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn rounded-pill',
            cancelButton: 'btn rounded-pill'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('SOCKET: Request to delete a product sent to server =>', 'id:', id)
            socket.emit('deleteItem', id)
            Swal.fire({
                title: 'Success',
                text: `"${title}" has been deleted successfully`,
                icon: 'success',
                confirmButtonColor: '#1a1a1a',
                customClass: {
                    confirmButton: 'btn rounded-pill'
                }
            })
        }
    })
}

socket.on('getProducts', products => {
    itemListContainer.innerHTML = ''
    products.forEach( product => {
        itemListContainer.innerHTML  += 
            `<div class="card col-md-3 mb-3">
                <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <h6 class="card-subtitle text-muted">${product.category}</h6>
                </div>
                <div class="card-body">
                <p class="card-text">${product.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Price: $${product.price}</li>
                </ul>
                <div class="card-body">
                <a href="#" onclick="handleDelete('${product.title}', ${product.id})" class="card-link btn btn-sm btn-outline-danger py-0 px-2 rounded-pill">Delete</a>
                </div>
            </div>`
        })
})