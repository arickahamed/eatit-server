const Product = require("./productModel");

exports.getProducts = async() => {
    const products = await Product.find();
    return products;
};

exports.createProduct = async(productData) => {
    const newProduct = new Product(productData)
    return await newProduct.save();
};