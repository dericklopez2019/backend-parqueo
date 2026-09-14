const TipoVehiculo = require('../models/tipo_vehiculo.model');

// Obtener todos los tipos de vehículo
exports.getTiposVehiculo = async (req, res) => {
    try {
        const tipos = await TipoVehiculo.findAll();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener los tipos de vehículo' });
    }
};

// Obtener un tipo por ID
exports.getTipoVehiculoById = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await TipoVehiculo.findByPk(id);
        
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener el tipo de vehículo' });
    }
};

// Crear un nuevo tipo de vehículo
exports.createTipoVehiculo = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del tipo de vehículo es obligatorio' });
        }

        const nuevoTipo = await TipoVehiculo.create({ nombre });
        res.status(201).json(nuevoTipo);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Este tipo de vehículo ya existe' });
        }
        res.status(500).json({ error: error.message, message: 'Error al crear el tipo de vehículo' });
    }
};

// Actualizar un tipo de vehículo
exports.updateTipoVehiculo = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await TipoVehiculo.findByPk(id);
        
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }

        const { nombre } = req.body;
        await tipo.update({ nombre });
        
        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al actualizar el tipo de vehículo' });
    }
};

// Eliminar un tipo de vehículo
exports.deleteTipoVehiculo = async (req, res) => {
    try {
        const id = req.params.id;
        const tipo = await TipoVehiculo.findByPk(id);
        
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }

        await tipo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al eliminar el tipo de vehículo' });
    }
};