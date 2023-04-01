const express = require('express');
const router = express.Router();
const truckController = require('../../controllers/truckController');

router.route('/')
    .get(truckController.getTrucks)
    .post(truckController.createNewTruck)
    .put(truckController.updateTruck)
    .delete(truckController.deleteTruck);

router.route('/:truckId')
    .get(truckController.getTruck);

module.exports = router;