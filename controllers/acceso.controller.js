const Acceso = require('../models/acceso.model');

// Obtener todo el historial
exports.getAccesos = async (req, res) => {
    try {
        const accesos = await Acceso.findAll();
        res.status(200).json(accesos);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener los accesos' });
    }
};

// Registrar cuando un vehículo ENTRA al parqueo
exports.registrarEntrada = async (req, res) => {
    try {
        const { vehiculo_placa, espacio_id } = req.body;
        
        if (!vehiculo_placa || !espacio_id) {
            return res.status(400).json({ message: 'La placa y el espacio_id son obligatorios' });
        }

        // fecha_entrada se pone automáticamente por el modelo
        const nuevaEntrada = await Acceso.create({ vehiculo_placa, espacio_id });
        res.status(201).json(nuevaEntrada);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al registrar la entrada' });
    }
};

// Registrar cuando un vehículo SALE del parqueo
exports.registrarSalida = async (req, res) => {
    try {
        const id = req.params.id;
        const acceso = await Acceso.findByPk(id);
        
        if (!acceso) {
            return res.status(404).json({ message: 'Registro de acceso no encontrado' });
        }

        // Si ya tiene fecha de salida, significa que ya había salido antes
        if (acceso.fecha_salida) {
            return res.status(400).json({ message: 'Este vehículo ya registró su salida previamente' });
        }

        // Actualizamos poniendo la fecha de salida actual y el monto a cobrar
        const { monto_pagado } = req.body; 
        await acceso.update({ 
            fecha_salida: new Date(), // Asigna la fecha y hora de este momento
            monto_pagado: monto_pagado || 0 
        });
        
        res.status(200).json(acceso);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al registrar la salida' });
    }
};

// Eliminar un registro de acceso (por si hubo un error del operador)
exports.deleteAcceso = async (req, res) => {
    try {
        const id = req.params.id;
        const acceso = await Acceso.findByPk(id);
        
        if (!acceso) {
            return res.status(404).json({ message: 'Acceso no encontrado' });
        }

        await acceso.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al eliminar el acceso' });
    }
};