// Desencripta el Json web token

const jwt = require("jsonwebtoken")

const decrypt = async (req, res, next) => {

    // Capturar el token y guardarlo en una variable.
    const token = req.header("x-auth-token")

    if(!token) {
        return res.status(401).json({
            msg: "No hay token, permiso no válido"
        })
    }

    // Si si hay token y todo bien...
    try {
        const openToken = await jwt.verify(token, process.env.SECRET)
        
        console.log("openToken", openToken);

        req.user = openToken.user

        next()
        
    } catch (error) {
        res.json(
            {
                msg: "Hubo un error con el Token",
            }
        )
    }
}


module.exports = decrypt