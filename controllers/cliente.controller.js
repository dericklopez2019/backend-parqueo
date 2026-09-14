const Cliente = require('../models/cliente.model');

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error al obtener los clientes'
        });
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const { dpi, nombre, apellido, telefono, suscripcion_id } = req.body;

        // Validación simple para asegurar que el DPI venga en la petición
        if (!dpi || !nombre || !apellido) {
            return res.status(400).json({
                message: 'DPI, nombre y apellido son obligatorios'
            });
        }

        const nuevoCliente = await Cliente.create({ dpi, nombre, apellido, telefono, suscripcion_id });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        // Manejo específico si el DPI ya existe
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El DPI ingresado ya está registrado' });
        }
        res.status(500).json({
            error: error.message,
            message: 'Error al crear el cliente'
        });
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado en la base de datos'
            });
        }

        const { dpi, nombre, apellido, telefono, suscripcion_id } = req.body;
        await cliente.update({ dpi, nombre, apellido, telefono, suscripcion_id });
        
        res.status(200).json(cliente);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El DPI ingresado pertenece a otro cliente' });
        }
        res.status(500).json({
            error: error.message,
            message: 'Error al actualizar el cliente'
        });
    }
};

// Eliminar un cliente (Por cascada, esto eliminará sus vehículos)
exports.deleteCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado en la base de datos'
            });
        }

        await cliente.destroy();
        res.status(204).send(); // 204 No Content es el estándar para eliminaciones exitosas
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error al eliminar el cliente' 
        });
    }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado en la base de datos'
            });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error al obtener el cliente'
        });
    }  
};