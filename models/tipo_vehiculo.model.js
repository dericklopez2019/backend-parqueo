const { DataTypes } = require('sequelize');
const db = require('../db/db');

const TipoVehiculo = db.define('TipoVehiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(30), // Ejemplo: 'Carro', 'Moto'
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'tipos_vehiculo',
    timestamps: false
});

module.exports = TipoVehiculo;