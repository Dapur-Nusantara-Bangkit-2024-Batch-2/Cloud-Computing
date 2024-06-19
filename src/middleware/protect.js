const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  // Get the JWT from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // If there is no token, return an error
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Add the decoded user object to the request object
    req.user = decoded;

    // Call the next middleware function or route handler
    next();
  } catch (error) {
    // If the token is invalid or has expired, return an error
    res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

module.exports = protectRoute;
