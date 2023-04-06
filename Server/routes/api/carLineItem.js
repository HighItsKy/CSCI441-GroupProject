const express = require('express');
const router = express.Router();
const carLineItemController = require('../../controllers/carLineItemController');

router.route('/')
    .get(carLineItemController.getAll)
    .post(carLineItemController.createCarLineItem)

router.route('/:carLineItemId')
    .get(carLineItemController.getCarLineItem)

module.exports = router;