const bcrypt = require('bcrypt');
const Users = require('../Models/User.model');
const createUserService = require('../Services/createService');

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    await createUserService(req, res); // Delegating logic to the service
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Controller function to fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
