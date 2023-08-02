// const jwt = require("jsonwebtoken");

// exports.refreshToken = async (req, res) => {
//     try {
//         const bearerToken = req.headers["authorization"];
//         const token = bearerToken.split(" ")[1];
//         const VerifyToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

//         if (VerifyToken) {
//             req.user = VerifyToken.user;
//             next();
//         } else {
//             return res.status(403).json({ msg: "Unauthorized" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(404).json({ msg: error });
//     }
// };
