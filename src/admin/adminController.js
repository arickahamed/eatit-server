const mongoose = require("mongoose");
const User = require("../users/userModel");
const PendingOrder = require("./adminModel");

exports.getPendingOrders = async (req, res) => {
    try {
        const orders = await PendingOrder.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Failed to fetch pending orders:", error);
        res.status(500).json({ success: false });
    }
};

exports.approvePendingOrder = async (req, res) => {
    try {
        const pendingOrder = await PendingOrder.findById(req.params.id);
        if (!pendingOrder) return res.status(404).json({ success: false, message: "Pending order not found" });

        const user = await User.findOne({ email: pendingOrder.email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        user.orders.push({ items: pendingOrder.items, total: pendingOrder.total });
        await user.save();
        await PendingOrder.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Order approved and added to user" });
    } catch (error) {
        console.error("Approval failed:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deletePendingOrder = async (req, res) => {
    try {
        const order = await PendingOrder.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.json({ success: true, message: "Order dismissed" });
    } catch (error) {
        console.error("Dismiss failed:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};