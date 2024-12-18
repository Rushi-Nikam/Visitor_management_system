const loginUser = require('../Services/authService'); // Import the loginUser function

// Controller for handling login requests
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Call the loginUser service function
    const result = await loginUser(email, password);

    if (result.success) {
      // Return the JWT token and user info if login is successful
      return res.status(200).json({
        success: true,
        message: result.message,
        token: result.token,
        user: result.user,
      });
    } else {
      // Return error message if login fails
      return res.status(401).json({ success: false, message: result.message }); // Use 401 for unauthorized access
    }
  } catch (error) {
    console.error('Error in loginController:', error.message);
    // Return a generic error message for unexpected errors
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = loginController;
