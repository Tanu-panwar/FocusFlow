const User = require("./models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
    console.log("Request Headers:", req.headers);
    console.log("Cookies:", req.cookies); // Debugging

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token); // Debugging

    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized - No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.status(403).json({ status: false, message: "Invalid token" });
        }

        try {
            const user = await User.findById(data.id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            req.user = user;  
            console.log("Authenticated user:",user);
            next();           
            
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ status: false, message: "Internal server error" });
        }
    });
};
