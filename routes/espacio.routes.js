const express = require('express');
const router = express.Router();
const espacioController = require('../controllers/espacio.controller');

router.get('/espacios', espacioController.getEspacios);
router.get('/espacios/:id', espacioController.getEspacioById);
router.post('/espacios', espacioController.createEspacio);
router.put('/espacios/:id', espacioController.updateEspacio);
router.delete('/espacios/:id', espacioController.deleteEspacio);

module.exports = router;