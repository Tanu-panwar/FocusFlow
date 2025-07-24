
const User = require("../models/user");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const { sendVerificationEamil, senWelcomeEmail } = require("../email.js");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const user = await User.create({
      email, password, username, createdAt, otp,
      otpExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    await sendVerificationEamil(user.email, otp)
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, token, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    await sendVerificationEamil(user.email, otp);
    return res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error in resendOTP:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.verfiyEmail = async (req, res) => {
  try {
    const { code } = req.body //otp
    console.log("Incoming code:", code);
    const user = await User.findOne({
      otp: code,
      otpExpiresAt: { $gt: Date.now() }
    });
    console.log("user verified:", user);
    if (!user) {
      return res.status(400).json({ success: false, message: "Inavlid or Expired Code" })
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save()
    await senWelcomeEmail(user.email, user.username)
    return res.status(200).json({ success: true, message: "Email Verifed Successfully" })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "internal server error" })
  }
}


module.exports.Login = async (req, res, next) => {
  try {
    console.log("Login Request Received:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });
    res.status(201).json({ message: "User logged in successfully", success: true, token, user });
    next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.forgetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error("Error during password reset:", err.message);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};


module.exports.Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "None"
    });

    res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

