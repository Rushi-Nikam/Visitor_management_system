const { DataTypes } = require('sequelize');
const db = require('../db/db');
const Role = require('./Role.model'); // Import the Role model

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  roleid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
}, {
  timestamps: false,
});


User.belongsTo(Role, {
  foreignKey: 'roleid', 
  targetKey: 'id',      
});

module.exports = User;
