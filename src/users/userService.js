const User = require("./userModel");

exports.existingUser = async (email) => {
    return await User.findOne({ email });
}

exports.getAllUsers = async () => {
    return await User.find();
}

exports.createUser = async (data) => {
    const newUser = new User(data);
    return await newUser.save();
}


exports.deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
    const users = await User.find();
    return users;
}


