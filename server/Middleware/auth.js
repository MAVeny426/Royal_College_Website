import jwt from "jsonwebtoken";
import dot from "dotenv";

dot.config();
const secretkey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.StudntToken;

    if (!token) {
      console.log("No StudntToken found in cookies");
      return res
        .status(401)
        .json({ message: "Authentication token not found" });
    }

    const verifytoken = jwt.verify(token, secretkey);
    req.email = verifytoken.email;
    req.role = verifytoken.role;
    next();
  } catch (error) {
    console.error("Error verifying token: ", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticate
