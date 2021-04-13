const Sequelize = require('sequelize')
const db = require('../../config/db')

const Category = require('../models/Category')

const Device = db.define('devices', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  idCategory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      len: [1, 16]
    }
  },
  partNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true
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

Device.belongsTo(Category, { as: 'category', foreignKey: 'idCategory' })

module.exports = Device
