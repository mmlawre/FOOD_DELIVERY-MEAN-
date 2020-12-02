const express = require("express");
const router = express.Router();

const CustomerController = require('../controllers/customer.js');
const checkAuth = require('../middleware/check-auth');


router.post("/customers/", checkAuth, CustomerController.create);


router.get("/customers/:userID", checkAuth, CustomerController.get);

router.patch("/customers/:id", checkAuth, CustomerController.update);

router.delete("/customers/:id", checkAuth, CustomerController.delete);

module.exports = router;
