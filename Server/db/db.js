const {Sequelize} = require('sequelize');

// Initialize sequelize

const sequelize = new Sequelize('Visitoria','root','Rushikesh@27',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize;