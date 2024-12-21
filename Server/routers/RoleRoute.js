const express = require('express');
const roleController = require('../Controllers/RoleController');
const OtpController = require('../Controllers/otpController');
const RoleRoute = express.Router();

// Route to create a new role
RoleRoute.post('/roles', roleController.createRole);

// Route to get all roles
RoleRoute.get('/roles', roleController.getAllRoles);

// Route to get a specific role by ID
RoleRoute.get('/roles/:id', roleController.getRoleById);

// Route to update a role by ID
RoleRoute.put('/roles/:id', roleController.updateRole);

// Route to delete a role by ID
RoleRoute.delete('/roles/:id', roleController.deleteRole);

// Route to sendOtp
RoleRoute.post('/send-otp', OtpController.sendOtp);

module.exports = RoleRoute;
