const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    items: [
        {
            title: String,
            image: String,
            price: Number,
            quantity: Number,
            id: String,
        },
    ],
    total: Number,
    createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    orders: [orderSchema]
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);