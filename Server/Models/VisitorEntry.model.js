const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

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
      model: 'Visitors', // Name of the Visitors table
      key: 'id',
    },
    onDelete: 'CASCADE',  // Ensures the visitor entry is deleted when the visitor is deleted
    onUpdate: 'CASCADE',
  },
  visited: {
    type: DataTypes.ENUM('Yes', 'No'),
    defaultValue: 'No',
  },
  visiting_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  whom_to_meet: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  purpose_of_meet: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: { 
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    defaultValue: 'pending',
  },
  created_by: {
    type: DataTypes.STRING(100),
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_by: {
    type: DataTypes.STRING(100),
  },
  updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

module.exports = VisitorEntry;
