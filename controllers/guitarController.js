const Guitar = require ("./../models/Guitar")

exports.create = async (req, res) => {

    // Del formulario, creamos variables y asignamos valores.

   const { 
       nombre, 
       precio, 
       color, 
       imagen, 
       descripcion
    } = req.body

    // Crear una guitarra en base de datos
    try {
        const newGuitar = await Guitar.create({
            nombre, 
            precio,
            color,
            imagen,
            descripcion
        })
        // Devolver una respuesta en un formato Json.
        res.json ({
            msg: "Guitarra creada con éxito",
            data: newGuitar
        })
    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error creando la guitarra",
            error: error
        })
    }
}

exports.readAll = async (req,res) => {

    try {
        const guitars = await Guitar.find({})

            res.json({
                msg:"Guitarras obtenidas con éxito",
                data: guitars
            })
        
    } catch (error) {

        res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error
        })
        
    }
}

exports.readOne = async (req, res) => {

    const { id } = req.params

    try {
        const guitar = await Guitar.findById(id)

        res.json({
            msg: "Guitarra obtenida con éxito",
            data: guitar
        })

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error
        })
    }
}

exports.edit = async (req, res) => {
    
    const { id } = req.params

    // Obteniendo datos del formulario
    const { 
        nombre,
        precio,
        color,
        imagen,
        descripcion
    } = req.body

    try {
        const updatedGuitar = await Guitar.findByIdAndUpdate(
            id, // ID de guitarra
            {
            nombre,
            precio,
            color,
            imagen,
            descripcion // propiedades a cambiar
        },
        {new:true} 
        )
        res.json({
            msg: "Guitarra actualizada con éxito",
            data: updatedGuitar
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error con la actualización de guitarra",
            error: error
        })       
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {
        const deletedGuitar = await Guitar.findByIdAndDelete({_id: id})

        res.json({
            msg: "Guitarra borrada con éxito",
            data: deletedGuitar
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando la guitarra",
            error: error
        })
        
    }

}