const model = require('../models/Category')
const { Op, Sequelize } = require('sequelize')

async function findOne (id) {
  try {
    result = await model.findOne({
      where: {
        id
      }
    })
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

async function findAll () {
  try {
    result = await model.findAndCountAll({})
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

async function create (data) {
  try {
    result = await model.create(data)
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

async function remove (id) {
  try {
    result = await model.destroy({ where: { id } })
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

async function update (data) {
  const id = data.params.id
  try {
    result = await model.update(data.body, {
      where: { id: id }
    })
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = { findOne, findAll, create, remove, update }
