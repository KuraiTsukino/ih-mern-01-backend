// 1. Importaciones
const mongoose = require("mongoose")

// 2. Schema
const userSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        default: ""
    },
    pais: {
        type: String,
        default: ""
    },
    direccion: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// 3. Modelos.
const User = mongoose.model("User", userSchema)

// 4. Exportación
module.exports = User