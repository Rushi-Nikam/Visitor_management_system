const express = require('express');
const userRoute = express.Router();
const { createUsers, getAllUsers,getUser,deleteUsers,updateUsers } = require('../Controllers/UserController'); // Import the controller functions

// Route to create a new user
userRoute.post('/create', createUsers);

// Route to fetch all users
userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUser);

// Placeholder for future user routes
// Route to fetch a user by ID
userRoute.delete('/:id',deleteUsers); 

// Route to update a user by ID
userRoute.put('/:id', updateUsers); 

// Route to delete a user by ID
// userRoute.delete('/:id', deleteUser); 

module.exports = userRoute;
