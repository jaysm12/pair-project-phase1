const express = require('express')
const router = express.Router()

const ControllerAboutus = require('../controller/controllerAboutus')

router.get('/', ControllerAboutus.index)

module.exports = router