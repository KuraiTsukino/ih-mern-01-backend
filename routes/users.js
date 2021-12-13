// 1. Importación
const express = require("express")
const router = express.Router()

const userController = require("./../controllers/userController")

// 2. Router
router.post("/create", userController.create)

// 3. Exportación
module.exports = router