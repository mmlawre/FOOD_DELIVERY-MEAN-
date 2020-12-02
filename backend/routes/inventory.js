const express = require("express");
const router = express.Router();

const InventoryController = require('../controllers/inventory.js');
const checkAuth = require('../middleware/check-auth');


router.post("/inventory", checkAuth, InventoryController.create);


router.get("/inventory/:userID", checkAuth, InventoryController.get);

router.patch("/inventory/:id", checkAuth, InventoryController.update);

router.delete("/inventory/:id", checkAuth, InventoryController.delete);

module.exports = router;
