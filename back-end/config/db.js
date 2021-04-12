const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbtest', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;