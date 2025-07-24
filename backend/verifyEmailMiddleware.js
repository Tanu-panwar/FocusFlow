

const User = require('./models/user');

module.exports.verfiyEmailMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        next();
    } catch (err) {
        console.error("verifyEmail middleware error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

