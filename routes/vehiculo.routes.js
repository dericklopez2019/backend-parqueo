const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');

router.get('/vehiculos', vehiculoController.getVehiculos);
router.get('/vehiculos/:placa', vehiculoController.getVehiculoByPlaca);
router.post('/vehiculos', vehiculoController.createVehiculo);
router.put('/vehiculos/:placa', vehiculoController.updateVehiculo);
router.delete('/vehiculos/:placa', vehiculoController.deleteVehiculo);

module.exports = router;