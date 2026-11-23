const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

let ultimoId = productos.length

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})

// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto

app.post('/productos', (req, res) => {

    const {
        nombre,
        descripcion,
        precio
    } = req.body

    if(!nombre || !descripcion || !precio) {
        return res.status(400).json({
            ok: false,
            error: "Todos los campos son obligatorios"
        })
    }

    const nuevoProducto = {
        id: ++ultimoId,
        nombre,
        descripcion,
        precio
    }

    productos.push(nuevoProducto)

    res.status(201).json({
        ok: true,
        data: nuevoProducto
    })
})

// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const producto = productos.find(producto => producto.id === id)

    if (!producto) {
        return res.status(404).json({
            ok: false,
            error: "Producto no encontrado"
        })
    }

    const {
        nombre,
        descripcion,
        precio
    } = req.body

    if (!nombre || !descripcion || !precio) {
        return res.status(400).json({
            ok: false,
            error: "Todos los campos son obligatorios"
        })
    }

    producto.nombre = nombre
    producto.descripcion = descripcion
    producto.precio = precio

    res.json({
        ok: true,
        data: producto
    })
})


// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({
            ok: false,
            error: "Producto no encontrado"
        })
    }

    const productoEliminado = productos.splice(index, 1)

    res.json({
        ok: "Producto eliminado",
        data: productoEliminado[0]
    })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
