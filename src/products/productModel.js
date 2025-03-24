const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    imageURL:{type:String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Products", productSchema);