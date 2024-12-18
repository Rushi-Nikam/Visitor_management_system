const bcrypt = require('bcryptjs');
const User = require('../Models/User.model');

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const { name, roleid, email, password, phone, created_by } = req.body;

    // Validate required fields
    if (!name || !roleid || !email || !password || !phone || !created_by) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already in use' 
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      roleid,
      created_by, // Track who created the user
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        roleid: newUser.roleid,
        created_by: newUser.created_by,
      }, // Exclude sensitive data like hashed password
    });
  } catch (error) {
    console.error(error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: error.errors.map(err => err.message) 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error creating user', 
    });
  }
};

module.exports = createUser;
