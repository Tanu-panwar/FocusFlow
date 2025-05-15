
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


// export const protectFlash = async (req, res, next) => {
//     try {
//       const token = req.cookies.jwt;
//       if (!token) return res.status(400).json({ message: "Unauthorized Access" });
  
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (!decoded) {
//         return res
//           .status(400)
//           .json({ message: " Unauthorized : Invalid Token " });
//       }
  
//       const user = await User.findById(decoded.id).select("-password");
//       /*
//           .select("-password"):
//           .select(): This method is used in Mongoose to specify which fields should be returned from the query.
//           "-password": This is the argument passed to .select(), and it indicates that you do not want the password field to be included in the result. In other words, it "excludes" the password field from the document being returned.
//           The minus sign (-) before password means "exclude this field."
//           This is important for security reasons, as you typically wouldn't want to expose the user's password when fetching their data.
//           */
  
//       if(!user) return res.status(400).json({message :"user not found"})
  
//           req.user = user;        
//           next();
//     } catch (error) {
//       console.log("error in protect Route ", error);
//       return res.status(500).json({message : "internal server error "})
//     }
//   };
