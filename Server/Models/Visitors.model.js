const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust this path to where your sequelize instance is configured

const Visitor = sequelize.define('Visitor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255),
    defaultValue: null,
    allowNull:true, 
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  mobile_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  pancard: {
    type: DataTypes.STRING(20),
    defaultValue: null
  },
  aadhar_card_number: {
    type: DataTypes.STRING(20),
    defaultValue: null
  },
  whom_to_meet: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  purpose_of_meet: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  visiting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  otp: {
    type: DataTypes.STRING(4),
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    defaultValue: 'pending'
  },
  visited: {
    type: DataTypes.ENUM('Yes', 'No'),
    defaultValue: 'No'
  },
  created_by: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_by: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'visitors', // Explicitly define the table name
  timestamps: false // Disable automatic timestamps if using custom created/updated fields
});

module.exports = Visitor;
