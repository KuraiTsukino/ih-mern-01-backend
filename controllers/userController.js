const bcryptjs = require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const User = require("../models/User")
const jwt = require ("jsonwebtoken")

exports.create = async (req, res) => {
    
    // 1. Obtener usuario, email y password del formulario, request
    const {
        nombre, 
        apellido,
        pais,
        direccion, 
        email,
        password
    } = req. body

    // 2a. Realizar el proceso asíncrono
    try {
        // 3. Generar password para base de datos.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt) // genera un pasword encriptado

        // 4. Crear usuario en base de datos.
        const newUser = await User.create({
            nombre, 
            apellido,
            pais,
            direccion, 
            email,
            password: hashedPassword // la referencia del password encriptado
        })
        
        // 5. Autenticación con Tokens
        // 5a. Crear un payload (información del usuario)
        const payload = {
            user: {
                id: newUser._id // ID del usuario del MongoDB.
            }
        }

        // 5b. Firmar el token. hay que asegurar al cliente que viene de parte del servidor, si no se firma puede venir de otro lado
        jwt.sign(
            payload, // datos que acompañarán al token
            process.env.SECRET, // palabra secreta (firma)
            {
                expiresIn: 360000 // expiración del token
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    msg: "Token correctamente generado",
                    data: token
                })
            }
        )

    } catch (error) {
        // 2b. En caso de error con await
        res.status(500).json({
            msg:"Hubo un error con la creación de usuario",
            error: error
        })
        
    }
}