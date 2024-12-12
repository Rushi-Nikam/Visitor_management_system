const User = require('../Models/User.model');

// Function to create a new user
const createUser = async (req, res) => {
  try {
    const { name, roleid, email, phone, created_by } = req.body;

    if (!name || !roleid || !email || !phone || !created_by) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = await User.create({
      name,
      roleid,
      email,
      phone,
      created_by,
    });

    res.status(201).json({
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Other CRUD operations for users can go here

module.exports = { createUser };
