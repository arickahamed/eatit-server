const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getMyOrders", userController.myOrders);
router.post("/register", userController.createUser);
router.post("/confirmOrder", userController.confirmOrders);
router.delete("/delete/:id", userController.deleteUser);
router.post("/login", userController.loginUser);


module.exports = router ; 
