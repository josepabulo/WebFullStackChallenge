const Sequelize = require('sequelize')
const db = require('../../config/db')

const Category = db.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    validate: {
      len: [1, 128]
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Category
