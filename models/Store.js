// 1. Importaciones
const mongoose = require("mongoose")

// 2. Schema
const storeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    }, 
    telefono: {
        type: String
    }

})
// 3. Modelos
const Store = mongoose.model("Store", storeSchema)

// 4. Exportación
module.exports = Store