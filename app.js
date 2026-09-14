const express = require('express');
require('dotenv').config();

const sequelize = require('./db/db')
const ClienteModel = require('./models/cliente.model');
const VehiculoModel = require('./models/vehiculo.model');

const rutasClientes = require('./routes/cliente.routes');
const rutasVehiculos = require('./routes/vehiculo.routes');

const app = express()
app.use(express.json())

// Maquetar las rutas
app.use('/api', rutasClientes);
app.use('/api', rutasVehiculos);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Base de datos conectada')
  })
}).catch(err => {
  console.error('Error al conectar la base de datos', err)
})