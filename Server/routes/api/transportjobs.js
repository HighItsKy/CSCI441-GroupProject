const express = require('express');
const router = express.Router();
const transportController = require('../../controllers/transportjobController');

router.route('/')
    .get(transportController.getAllJobs)
    .post(transportController.createNewJob)
    .put(transportController.updateJob)
    .delete(transportController.deleteJob);

router.route('/:Job')
    .get(transportController.getJob);

module.exports = router;