const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String
    },
    userName: {
        type: String,
        required: [true, "username is required."],
        unique: true,
        trim: true,
        minlength: [3, "username must be at least 3 characters long."],
        maxlength: [20, "username cannot be more than 20 characters long."]
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            trim: true,
            minlength: [3, "First name must be at least 3 characters long."]
        },
        lastName: {
            type: String,
            // required: [true, "Last name is required."],
            trim: true,
            // minlength: [3, "Last name must be at least 3 characters long."]
        }
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters long."],
        select: false
    },
    totalProfit: {
        type: Number,
        default: 0
    },
    trades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trade'
    }],
    watchlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'watchlist'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//for generating authetication token usingn jwt:
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// using bcrypt hashPassword:
userSchema.statics.hashPassword = async function (password) {
    // Generate salt with 10 rounds
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    return await bcrypt.hash(password, salt);
};

//using bcyrypt compare password with hashPassword:
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const user = mongoose.model("user", userSchema);

module.exports = user;
