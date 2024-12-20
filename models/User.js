const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], // only allow 'user' or 'admin' roles
        default: "user",
    },
}, {
    timestamps: true // Automatically handles createdAt and updatedAt
});

module.exports = mongoose.model("User", userSchema);
