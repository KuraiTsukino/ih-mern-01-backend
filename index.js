// 1. Importaciones
const express = require("express");
const app = express()

require("dotenv").config()

const connectDB = require("./config/db")

// 2. Middlewares
// Base de datos
connectDB()
// Todas las peticiones y respuestas se manejan en protocolo Json
app.use(express.json())



// 3. Rutas
app.use("/guitars", require("./routes/guitars"))
app.use("/stores", require ("./routes/stores"))
app.use("/users", require("./routes/users"))


// 4. Server
app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto http://localhost:${process.env.PORT}`)
})