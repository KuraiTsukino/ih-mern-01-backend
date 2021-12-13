// 1. Importaciones
const mongoose = require("mongoose")

// 2. Schema
const guitarSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }, 
    precio: {
        type: Number,
        required: true
    }, 
    color: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

// 3. Modelo
const Guitar = mongoose.model("Guitar", guitarSchema)

// 4. Exportación
module.exports = Guitar