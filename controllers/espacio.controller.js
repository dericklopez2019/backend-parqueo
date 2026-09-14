const Espacio = require('../models/espacio.model');

// Obtener todos los espacios
exports.getEspacios = async (req, res) => {
    try {
        const espacios = await Espacio.findAll();
        res.status(200).json(espacios);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener los espacios' });
    }
};

// Obtener un espacio por su ID
exports.getEspacioById = async (req, res) => {
    try {
        const id = req.params.id;
        const espacio = await Espacio.findByPk(id);
        
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        res.status(200).json(espacio);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener el espacio' });
    }
};

// Crear un nuevo espacio físico
exports.createEspacio = async (req, res) => {
    try {
        const { codigo, tipo_vehiculo_id, estado } = req.body;

        if (!codigo || !tipo_vehiculo_id) {
            return res.status(400).json({ message: 'El código y el tipo_vehiculo_id son obligatorios' });
        }

        const nuevoEspacio = await Espacio.create({ codigo, tipo_vehiculo_id, estado });
        res.status(201).json(nuevoEspacio);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El código de este espacio ya existe' });
        }
        res.status(500).json({ error: error.message, message: 'Error al crear el espacio' });
    }
};

// Actualizar un espacio 
exports.updateEspacio = async (req, res) => {
    try {
        const id = req.params.id;
        const espacio = await Espacio.findByPk(id);
        
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }

        const { codigo, tipo_vehiculo_id, estado } = req.body;
        await espacio.update({ codigo, tipo_vehiculo_id, estado });
        
        res.status(200).json(espacio);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al actualizar el espacio' });
    }
};

// Eliminar un espacio
exports.deleteEspacio = async (req, res) => {
    try {
        const id = req.params.id;
        const espacio = await Espacio.findByPk(id);
        
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }

        await espacio.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al eliminar el espacio' });
    }
};