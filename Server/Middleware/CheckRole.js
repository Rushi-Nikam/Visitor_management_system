const jwt = require('jsonwebtoken');

// Middleware to check the user's role
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decoded.role;  // Get role from decoded token

      // Check if the user's role matches the required role
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();  // Role is sufficient, proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = checkRole;
