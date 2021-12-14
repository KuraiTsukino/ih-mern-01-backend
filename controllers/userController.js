const bcryptjs = require("bcryptjs")
const { JsonWebTokenError } = require("jsonwebtoken")
const User = require("../models/User")
const jwt = require ("jsonwebtoken")

// Crear un usuario
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

// Iniciar sesión
// Autenticar que la persona pase su email y contraseña, coincidan y se le envía un token.
exports.login = async (req, res) => {

    // 1. Obtener el email y el password del formulario.
    const { email, password } = req.body

    try {
       // 2. Ubicar al usuario en base de datos.
       const foundUser = await User.findOne({ email })
       
       // 3. Validación, si no hubo un usuario...
       if (!foundUser) {
           return res.status(400).json({
               msg: "El usuario o la contraseña son incorrectos"
           })
       }

       // 4. Si el usuario fue encontrado, se evalúa la contraseña. Indicar la comparación con bcryptjs
       const verifiedPass = await bcryptjs.compare(password, foundUser.password)

       // 5. Validación, si el password no coincide...
       if (!verifiedPass) {
           return await res.status(400).json({
               msg: "EL usuario o la contraseña no coinciden"
           })
       }

       // 6. Si todo coincide y es correcto, generamos un Json Web Token

       //console.log("foundUser:", foundUser);
       // 6a. Establecer un payload (datos del usuario)
       const payload = {
           user: {
               id: foundUser.id
           }
       }

       // 6b. Firma del Json Web Token.
       jwt.sign(
           payload,
           process.env.SECRET,
           {
               expiresIn: 360000
           },
           (error, token) => {
               if(error) throw error
               res.json({
                   msg: "Inicio de sesión exitoso",
                   data: token
               })
           }
       )

       return

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un problema con la utenticación",
            data: error
        })
    }
}

// Verificar usuario.
// Cuando estamos accediendo a diferentes rutas (guitarras como tiendas) preguntar si el usuario tiene permisos o no, para verificarlo se le pide su token. Una ruta que pide tokens para verificar.
// Cada que se entra a una página va a verificar el usuario. Identifica si está loggeado el usuario, si se desconecta, el token no existe y manda a la sesión de Login.
// verifyToken require que se desencripte el proceso del Token. 
exports.verifyToken = async (req, res) => {

    try {

        // 1. Buscar el ID del usuario (del token abierto) en base de datos
        const foundUser = await User.findById(req.user.id).
        select("-password")

        return res.json({
            msg: "Datos de usuario encontrados",
            data: foundUser
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error con el usuario"
        })
    }
}