const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Cliente = db.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dpi: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    suscripcion_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'clientes',
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: false
});

module.exports = Cliente;