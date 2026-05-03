const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String
    },

    userName: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },

    fullName: {
        firstName: {
            type: String,
            trim: true,
            minlength: 3
        },
        lastName: {
            type: String,
            trim: true
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
        minlength: 6,
        select: false
    },

    isGoogleUser: {
        type: Boolean,
        default: false
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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
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
