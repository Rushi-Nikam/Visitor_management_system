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

// Function to update an existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roleid, email, password, phone } = req.body;

    // Check if the user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update user details
    if (name) user.name = name;
    if (roleid) user.roleid = roleid;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Hash the password if it needs updating
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleid: user.roleid,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error updating user',
    });
  }
};

// Function to delete a user
const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy(); // Deletes the user from the database
  } catch (err) {
    console.error(err);
    throw new Error("Error deleting user from the database");
  }
};

module.exports = { createUser, updateUser, deleteUser };
