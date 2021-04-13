const router = require('express').Router()
const controllerIndex = require('../controllers/index')

router.get('/', controllerIndex.get)
router.use('/category', require('./category'))
router.use('/device', require('./device'))

module.exports = router
