const Role = require('../Models/Role.model'); // Import the Role model

// Controller to create a new role
const createRole = async (req, res) => {
  const { name, created_by } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Role name is required' });
  }

  try {
    const newRole = await Role.create({
      name,
      created_by,
    });

    res.status(201).json({
      message: 'Role created successfully!',
      data: newRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error creating role: ${error.message}` });
  }
};

// Controller to get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching roles: ${error.message}` });
  }
};

// Controller to get a role by its ID
const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching role: ${error.message}` });
  }
};

// Controller to update a role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, updated_by } = req.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    role.name = name || role.name;
    role.updated_by = updated_by || role.updated_by;

    await role.save();

    res.status(200).json({
      message: 'Role updated successfully!',
      data: role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error updating role: ${error.message}` });
  }
};

// Controller to delete a role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await role.destroy();

     res.status(200).json({ message: 'Role deleted successfully!' });
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: `Error deleting role: ${error.message}` });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
