const express = require('express')
const router = express.Router()

const ControllerHome = require('../controllers/controllerHome')

router.get('/', ControllerHome.index)

module.exports = router