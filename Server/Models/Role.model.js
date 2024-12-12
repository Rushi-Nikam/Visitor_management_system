const { DataTypes } = require('sequelize');
const db = require('../db/db'); // Import the database connection

const Role = db.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_by: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: false,  // Disable automatic timestamp columns (createdAt, updatedAt)
});

module.exports = Role;
