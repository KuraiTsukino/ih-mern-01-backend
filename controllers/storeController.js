const Store = require("./../models/Store")

exports.create = async (req, res) => {

    // Del formulario, creamos variables y asignamos valores.

    const {
        nombre,
        domicilio,
        telefono
    } = req.body

    // Crear una tienda en base de datos.
    try {
        const newStore = await Store.create({
            nombre,
            domicilio,
            telefono
        })
        res.json({
            msg:"Tienda creada con éxito",
            data: newStore
        })
    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error creando la tienda",
            error: error
        })
    }

}

exports.readAll = async (req, res) => {

    try {
        const stores = await Store.find({})

            res.json({
                msg: "Tiendas obtenidas con éxito",
                data: stores
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
        const store = await Store.findById(id)

        res.json({
            msg: "Tienda obtenida con éxito",
            data: store
        })
    } catch (error) {

        res.status(500).json({
            msg:"Hubo un error obteniendo los datos",
            error: error
        })
        
    }
}

exports.edit = async (req, res) =>  {
    
    const { id } = req.params

    // Obteniendo datos del formulario
    const {
        nombre,
        domicilio,
        telefono
    } = req.body

    try {
        const updatedStore = await Store.findByIdAndUpdate(
            id,
            {
                nombre,
                domicilio,
                telefono
            },
            {new:true}
            )
            res.json({
                msg: "Tienda actualizada con éxito",
                data: updatedStore
            })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error con la actualización de la tienda",
            error: error
        })
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params

    try {
        const deletedStore = await Store.findByIdAndDelete({_id: id})

        res.json ({
            msg: "Tienda borrada con éxito",
            data: deletedStore
        })

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando la tienda",
            error: error
        })
    }

}