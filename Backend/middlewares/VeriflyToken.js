const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;


