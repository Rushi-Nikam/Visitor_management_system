const { DataTypes } = require('sequelize');
const db = require('../db/db'); // Import the database connection

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  roleid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Roles',  // This refers to the Roles table
      key: 'id',       // The column in the Roles table which is referenced
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,  // Ensure email is unique
  },
  phone: {
    type: DataTypes.STRING(15),
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

module.exports = User;
