const mongoose = require("mongoose");

const pendingOrderSchema = new mongoose.Schema({
    email: String,
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

module.exports = mongoose.model("PendingOrder", pendingOrderSchema);