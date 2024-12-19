const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(1);
    }
};

module.exports = connectDB;