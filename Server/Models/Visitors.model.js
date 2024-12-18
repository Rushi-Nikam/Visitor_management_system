const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const VisitorEntry = require('./VisitorEntry.model');  // Import the VisitorEntry model

const Visitors = sequelize.define('Visitors', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
  },
  pancard: {
    type: DataTypes.STRING(20),
  },
  aadhar_card_number: {
    type: DataTypes.STRING(20),
  },
  created_by: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  },
}, {
  timestamps: false,
});

Visitors.afterCreate(async (visitors, options) => {
  try {
    
    await VisitorEntry.create({
      visitor_id: visitors.id, 
      visited: 'No', 
      whom_to_meet: visitors.whom_to_meet, 
      purpose_of_meet: visitors.purpose_of_meet, 
      status: 'pending',
      created_by: visitors.created_by,
    });
  } catch (error) {
    console.error('Error creating visitor entry:', error);
  }
});

module.exports = Visitors;
