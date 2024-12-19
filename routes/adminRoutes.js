const express = require("express");
const router = express.Router();
const isAdminUser   = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, isAdminUser, (req, res) => {
    res.json({
        message: "Welcome to Admin Page",
    });
}); 

module.exports = router