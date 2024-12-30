// models/VisitorEntry.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const defineVisitorModel = require('./Visitors.model'); // Import Visitors model definition function

const defineVisitorEntryModel = () => {
  const VisitorEntry = sequelize.define('VisitorEntry', {
    entry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    visitor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Visitors', // Reference to the Visitors table
        key: 'id', // Link to the Visitors table's id column
      },
      onDelete: 'CASCADE', // Delete the entry if the corresponding visitor is deleted
      onUpdate: 'CASCADE',
    },
    whom_to_meet: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    purpose_of_meet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    visited: {
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'pending'),
      defaultValue: 'pending',
    },
    photo: {
      type: DataTypes.BLOB, // Store photo as a binary large object
      allowNull: true, // Photo is optional, default is NULL
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set to current timestamp
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updated_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW, // Automatically update timestamp on modification
    },
  }, {
    timestamps: false, // Disable default timestamp fields (createdAt, updatedAt)
  });

  // Define associations with Visitors model
  const Visitors = defineVisitorModel();  // Import the defined Visitors model
  VisitorEntry.belongsTo(Visitors, {
    foreignKey: 'visitor_id',
  });

  return VisitorEntry;
};

module.exports = defineVisitorEntryModel;
