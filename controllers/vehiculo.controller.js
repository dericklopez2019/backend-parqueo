const Vehiculo = require('../models/vehiculo.model');

exports.getVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener los vehículos' });
    }
};

exports.getVehiculoByPlaca = async (req, res) => {
    try {
        const placa = req.params.placa;
        const vehiculo = await Vehiculo.findByPk(placa);
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al obtener el vehículo' });
    }  
};

exports.createVehiculo = async (req, res) => {
    try {
        const { placa, cliente_id, tipo_vehiculo_id, marca, color } = req.body;
        
        if (!placa || !cliente_id || !tipo_vehiculo_id) {
            return res.status(400).json({ message: 'La placa, el cliente_id y el tipo_vehiculo_id son obligatorios' });
        }

        const nuevoVehiculo = await Vehiculo.create({ placa, cliente_id, tipo_vehiculo_id, marca, color });
        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Esta placa ya está registrada' });
        }
        res.status(500).json({ error: error.message, message: 'Error al registrar el vehículo' });
    }
};

exports.updateVehiculo = async (req, res) => {
    try {
        const placa_id = req.params.placa;
        const vehiculo = await Vehiculo.findByPk(placa_id);
        
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        const { placa, cliente_id, tipo_vehiculo_id, marca, color } = req.body;
        await vehiculo.update({ placa, cliente_id, tipo_vehiculo_id, marca, color });
        
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al actualizar el vehículo' });
    }
};

exports.deleteVehiculo = async (req, res) => {
    try {
        const placa = req.params.placa;
        const vehiculo = await Vehiculo.findByPk(placa);
        
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        await vehiculo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Error al eliminar el vehículo' });
    }
};