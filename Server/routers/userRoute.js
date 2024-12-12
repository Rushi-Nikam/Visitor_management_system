const express = require('express');
const router = express.Router();
const { createUser } = require('../Controllers/UserController'); // Import the controller functions

// Route to create a new user
router.post('/create', createUser);

// Other routes for users can be added here, e.g.:
// router.get('/', getAllUsers); // For fetching all users
// router.get('/:id', getUserById); // For fetching a user by ID
// router.put('/:id', updateUser); // For updating a user by ID
// router.delete('/:id', deleteUser); // For deleting a user by ID

module.exports = router;
