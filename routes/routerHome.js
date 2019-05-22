const express = require('express')
const router = express.Router()

const ControllerHome = require('../controller/controllerHome')

router.get('/', ControllerHome.index)

module.exports = router