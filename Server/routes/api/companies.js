const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companyController');

router.route("/")
    .get(companyController.getAll);

router.route("/:companyId")
    .get(companyController.getCompany);

router.route("/:companyId/branches")
    .get(companyController.getCompanyBranches);


module.exports = router;