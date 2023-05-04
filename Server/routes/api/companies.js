const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companyController');
const customerController = require('../../controllers/customerController')

router.route("/")
    .get(companyController.getCompanies)
    .post(companyController.createCompany)
    .put(companyController.updateCompany);

router.route("/:companyId")
    .get(companyController.getCompany);

router.route("/:companyId/branches")
    .get(companyController.getCompanyBranches)
    .post(companyController.createBranch);

router.route("/:companyId/branches/:branchId")
    .get(companyController.getBranch)
    .post(customerController.createCustomer)

router.route("/:companyId/branches/:branchId/customers")
    .get(companyController.getBranchCustomers)


module.exports = router;