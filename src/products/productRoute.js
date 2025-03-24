const express = require("express");
const productController = require("./productController");
const upload = require("../utils/productImageStorage");


const router = express.Router();

router.get("/getAllProducts", productController.getAllProducts);
router.post("/createProduct", upload.single("image"), productController.createProduct);

module.exports = router;