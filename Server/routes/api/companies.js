const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companyController');

router.route("/")
    .get(companyController.getCompanies)
    .post(companyController.createCompany);

router.route("/:companyId")
    .get(companyController.getCompany);

router.route("/:companyId/branches")
    .get(companyController.getCompanyBranches)
    .post(companyController.createBranch);

router.route("/:companyId/branches/:branchId")
    .get(companyController.getBranch)


module.exports = router;