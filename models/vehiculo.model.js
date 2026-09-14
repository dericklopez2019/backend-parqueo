const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Vehiculo = db.define('Vehiculo', {
    placa: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(50)
    },
    color: {
        type: DataTypes.STRING(30)
    }
}, {
    tableName: 'vehiculos',
    timestamps: false
});

module.exports = Vehiculo;