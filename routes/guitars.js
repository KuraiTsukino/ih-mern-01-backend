// 1. Importaciones
const { Router } = require("express")
const express = require("express")
const router = express.Router()

const guitarController = require("./../controllers/guitarController")

// 2. Ruteo. Router

// Crear guitarra.
router.post("/create", guitarController.create)

// Leer guitarras
router.get("/readall", guitarController.readAll)

// Leer una guitarra
router.get("/readone/:id", guitarController.readOne)

// Actualizar una guitarra.
router.put("/edit/:id", guitarController.edit)

// Borrar una guitarra.
router.delete("/delete/:id", guitarController.delete)

// 3. Exportaciones

module.exports = router