const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Espacio = db.define('Espacio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    tipo_vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'ocupado', 'mantenimiento'),
        defaultValue: 'disponible'
    }
}, {
    tableName: 'espacios',
    timestamps: false
});

module.exports = Espacio;