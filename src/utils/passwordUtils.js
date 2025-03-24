const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (plainPassword) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

// Function to verify a password
const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error verifying password');
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
};
