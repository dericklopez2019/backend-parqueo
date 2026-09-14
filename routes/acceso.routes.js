const express = require('express');
const router = express.Router();
const accesoController = require('../controllers/acceso.controller');

router.get('/accesos', accesoController.getAccesos);

router.post('/accesos/entrada', accesoController.registrarEntrada);
router.put('/accesos/salida/:id', accesoController.registrarSalida);

router.delete('/accesos/:id', accesoController.deleteAcceso);

module.exports = router;