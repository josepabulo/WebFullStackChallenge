const router = require('express').Router();
const controllerIndex = require('../controllers/index');

router.get('/', controllerIndex.get);
// router.use('/login', require('./login'));


module.exports = router;