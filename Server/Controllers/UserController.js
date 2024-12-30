// const bcrypt = require('bcrypt');
const Users = require('../Models/User.model');
const {createUser,updateUser,deleteUser} = require('../Services/createService');

// Controller function for creating a new user
const createUsers = async (req, res) => {
  try {
    await createUser(req, res); // Delegating logic to the service
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
const updateUsers = async (req, res) => {
  try {
    
    await updateUser(req , res); // Delegating logic to the service
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter in the URL
    await deleteUser(userId); // Call the deleteUser function with the user ID
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err); // Logging the error for debugging purposes
    return res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  createUsers,
  getAllUsers,
  updateUsers,
  deleteUsers
};
