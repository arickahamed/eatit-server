const mongoose = require("mongoose");
const User = require("../users/userModel");
const userService = require("../users/userService");
const { hashPassword, verifyPassword } = require("../utils/passwordUtils");


exports.getAllUsers = async(req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json({success: true, data: users});
    }catch (error) {
        res.status(500).json({success: false, message: "error in userRoute getall users"});
    }
};

exports.createUser = async(req, res) => {
    try {
        const {email, role, password} = req.body; 
        const hashedPassword = await hashPassword(password);
        const updatedData = {email, role, password : hashedPassword}
        const existingUser = await userService.existingUser(email);
        if(!existingUser) {
            // creating the new user
            const user = await userService.createUser(updatedData);
            res.status(201).json({
                success: true,
                message: `Successfully Registered`,
            })
        }else {
            // check if the user is already registered
            res.status(400).json({ success: false, message: `${email} already exists` });
        }
        
    }catch(error) {
        console.log("create user controller issue");
        res.status(400).json({success: false, message: error.message});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const gotUser = await userService.existingUser(email);
        if (gotUser != null || gotUser != undefined) {
            const hashedPassword = gotUser.password;
            const role = gotUser.role;
            const verifyPass = await verifyPassword(password, hashedPassword);
            if (verifyPass) {
                res.status(200).json({
                    success: true,
                    message: "Successfully login",
                    data: {
                        email: gotUser.email,
                        role
                    }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Please try again",
                })
            }
        } else {
            res.status(500).json({
                success: false,
                message: "Register first!"
            })
        }
    } catch (error) {
        console.log("something went wrong", error);
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID",
        });
    }

    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete the user
        const updatedUsers = await userService.deleteUser(id);
        if (!updatedUsers) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete user",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            users: updatedUsers,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
        });
    }
};

exports.confirmOrders = async (req, res) => {
    try {
        const { email, cartItems, total } = req.body;

        if (!email || !cartItems || !total) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.orders.push({
            items: cartItems,
            total,
            createdAt: new Date()
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: user.orders[user.orders.length - 1] 
        });
    } catch (err) {
        console.error("Order placement error:", err);
        res.status(500).json({
            success: false,
            message: "Server error while processing order",
            error: err.message
        });
    }
}

exports.myOrders = async (req, res) => {
    try {
        const {email} = req.query;
        if (!email ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        };

        const user = await User.findOne({email});
        if( !user ) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        };

        const myOrders = user.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).json({
            success: true,
            data: myOrders,
            messageg: "My orders are here"
        });

    } catch (err) {
        console.error("Order placement error:", err);
        res.status(500).json({
            success: false,
            message: "Server error while processing my order",
            error: err.message
        });
    }
}



// Dont create the API for upldate users
exports.updatedUsers = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;
    try {
        const existUser = await User.findById(id);
        if(!existUser){
            res.status(500).json({
                success:false,
                message: "Register first"
            });
        } else {

        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occured"
        })
    }
};
