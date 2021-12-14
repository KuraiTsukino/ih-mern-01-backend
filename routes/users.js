// 1. Importación
const express = require("express")
const router = express.Router()

const userController = require("./../controllers/userController")

const authorization = require("./../middleware/authorization")
// 2. Router

// Crear usuario
router.post("/create", userController.create)

// Iniciar sesión de usuario.
router.post("/login", userController.login)

// Verificación de usuario.
router.get("/verifyToken", authorization, userController.verifyToken)

// 3. Exportación
module.exports = router