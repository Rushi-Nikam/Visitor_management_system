const express = require('express');
const userRoute = express.Router();
const { createUser, getAllUsers } = require('../Controllers/UserController'); // Import the controller functions

// Route to create a new user
userRoute.post('/create', createUser);

// Route to fetch all users
userRoute.get('/', getAllUsers);

// Placeholder for future user routes
// Route to fetch a user by ID
// userRoute.get('/:id', getUserById); 

// Route to update a user by ID
// userRoute.put('/:id', updateUser); 

// Route to delete a user by ID
// userRoute.delete('/:id', deleteUser); 

module.exports = userRoute;
