const express = require('express');
const router = express.Router();
const tipoVehiculoController = require('../controllers/tipo_vehiculo.controller');

router.get('/tipos-vehiculo', tipoVehiculoController.getTiposVehiculo);
router.get('/tipos-vehiculo/:id', tipoVehiculoController.getTipoVehiculoById);
router.post('/tipos-vehiculo', tipoVehiculoController.createTipoVehiculo);
router.put('/tipos-vehiculo/:id', tipoVehiculoController.updateTipoVehiculo);
router.delete('/tipos-vehiculo/:id', tipoVehiculoController.deleteTipoVehiculo);

module.exports = router;