const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicleController');

router.route('/')
    .get(vehicleController.getAll)
    .post(vehicleController.createVehicle)

router.route('/:vehicleId')
    .get(vehicleController.getVehicle)

module.exports = router;