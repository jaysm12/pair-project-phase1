const express = require('express')
const router = express.Router()

const ControllerMarketplace = require('../controller/controllerMarketplace')

router.get('/', ControllerMarketplace.index)

module.exports = router