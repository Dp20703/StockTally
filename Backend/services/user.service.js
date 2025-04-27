const userModel = require('../models/user.model');


module.exports.createUser = async ({ userName, firstName, lastName, email, password }) => {
    console.log("User service function for create user");
    if (!userName || !firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        userName,
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        totalProfit: 0
    })
    return user;
}