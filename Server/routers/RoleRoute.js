const express = require('express');
const roleController = require('../Controllers/RoleController');
const router = express.Router();

// Route to create a new role
router.post('/roles', roleController.createRole);

// Route to get all roles
router.get('/roles', roleController.getAllRoles);

// Route to get a specific role by ID
router.get('/roles/:id', roleController.getRoleById);

// Route to update a role by ID
router.put('/roles/:id', roleController.updateRole);

// Route to delete a role by ID
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
