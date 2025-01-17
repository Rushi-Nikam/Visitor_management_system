const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');
const Role = require('../Models/Role.model');

// Function to login a user
const loginUser = async (email, password) => {
  try {
    // Find the user by email and include the associated Role
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role, // Include the Role model to fetch associated role details
        attributes: ['id', 'name'], // Select specific fields from the Role model
      },
    });

    // Check if user exists
    if (!user) {
      return { success: false, message: 'Invalid email or password', code: 401 };
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: 'Invalid email or password', code: 401 };
    }

    // Generate a JWT token after successful login
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.Role ? user.Role.name : null, 
      },
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Use dynamic expiry time
    );

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.Role ? user.Role.name : null, // Return role name in the response
      },
    };

  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login', code: 500 };
  }
};

module.exports = loginUser;
