const express = require("express");
const adminController = require("./adminController");
const router = express.Router();

router.get("/getPendingOrders", adminController.getPendingOrders);
router.patch("/approvePendingOrder/:id", adminController.approvePendingOrder);
router.delete("/deletePendingOrder/:id", adminController.deletePendingOrder);

module.exports = router;