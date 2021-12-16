// 1. Importaciones
const { Router } = require("express")
const express = require("express")
const router = express.Router()

const storeController = require("./../controllers/storeController")

// 2. Ruteo. Router

// Crear tienda
router.post("/create", storeController.create)

// Leer tiendas
router.get("/readall", storeController.readAll)

// Leer una tienda
router.get("/readone/:id", storeController.readOne)

// Actualizar una tienda.
router.put("/edit/:id", storeController.edit)

// Borrar una tienda.
router.delete("/delete/:id", storeController.delete)

// 3. Exportaciones

module.exports = router