const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.post("/register", userController.createUser);
router.post("/confirmOrder", userController.confirmOrders);
router.delete("/delete/:id", userController.deleteUser);
router.post("/login", userController.loginUser);


module.exports = router ; 
