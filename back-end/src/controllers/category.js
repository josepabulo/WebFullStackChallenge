const service = require('../services/category')

async function findOne (req, res) {
  const id = req.params.id

  service.findOne(id).then(v => {
    return res.json(v)
  })
}

async function findAll (req, res) {
  service.findAll().then(v => {
    return res.json(v)
  })
}

async function create (req, res) {
  service.create(req.body).then(v => {
    if (!v || v.errors || v == 0) {
      res.statusCode = 400
      const error = {
        status: 'error',
        name: v.name,
        errors: v.errors
      }
      return res.json(error)
    }

    if (v.id) {
      const response = {
        status: 'success',
        message: 'Successfully created',
        object: v
      }
      return res.json(response)
    }

    return res.json(v)
  })
}

async function remove (req, res) {
  const id = req.params.id

  service.remove(id).then(v => {
    if (!v || v.errors || v == 0) {
      res.statusCode = 400
      const error = {
        status: 'error',
        name: v.name,
        errors: v.errors
      }
      return res.json(error)
    }

    if (v == 1) {
      const response = {
        status: 'success',
        message: 'Successfully deleted'
      }
      return res.json(response)
    }

    return res.json(v)
  })
}

async function update (req, res) {
  service.update(req).then(v => {
    if (!v || v.errors || v == 0) {
      res.statusCode = 400
      const error = {
        status: 'error',
        name: v.name,
        errors: v.errors
      }
      return res.json(error)
    }

    if (v == 1) {
      const response = {
        status: 'success',
        message: 'Successfully updated'
      }
      return res.json(response)
    }

    return res.json(v)
  })
}

module.exports = { findOne, findAll, create, remove, update }