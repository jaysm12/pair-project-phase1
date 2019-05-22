const express = require('express')
const router = express.Router()

const ControllerMarketplace = require('../controllers/controllerMarketplace')

router.get('/', ControllerMarketplace.index)

module.exports = router