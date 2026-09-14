const express = require('express');
require('dotenv').config();

const sequelize = require('./db/db')
const ClienteModel = require('./models/cliente.model');
const VehiculoModel = require('./models/vehiculo.model');
const AccesoModel = require('./models/acceso.model');

const rutasClientes = require('./routes/cliente.routes');
const rutasVehiculos = require('./routes/vehiculo.routes');
const rutasAccesos = require('./routes/acceso.routes');

const app = express()
app.use(express.json())

// Maquetar las rutas
app.use('/api', rutasClientes);
app.use('/api', rutasVehiculos);
app.use('/api', rutasAccesos);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Base de datos conectada')
  })
}).catch(err => {
  console.error('Error al conectar la base de datos', err)
})