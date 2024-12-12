const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const VisitorEntry = sequelize.define('VisitorEntry', {
    entry_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    visitor_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose_of_meet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'pending'),
      defaultValue: 'pending',
    },
    created_by: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
    updated_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  }, {
    // Disable Sequelize's automatic timestamp handling
    timestamps: false, 
  });
  

  module.exports = VisitorEntry;