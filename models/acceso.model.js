const { DataTypes } = require('sequelize');
const db = require('../db/db');

const Acceso = db.define('Acceso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehiculo_placa: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    espacio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_entrada: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: true
    },
    monto_pagado: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'accesos',
    timestamps: false
});

module.exports = Acceso;