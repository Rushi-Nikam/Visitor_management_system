const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the role is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' }); // Forbidden
    }

    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Error in admin authentication:', error);
    return res.status(500).json({ message: 'Server error, authentication failed' });
  }
};

module.exports = authenticateAdmin;
