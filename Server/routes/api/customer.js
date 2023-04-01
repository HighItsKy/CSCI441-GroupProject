const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customerController');

router.route('/')
    .get(customerController.getAll)

module.exports = router;