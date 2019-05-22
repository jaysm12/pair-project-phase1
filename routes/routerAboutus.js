const express = require('express')
const router = express.Router()

const ControllerAboutus = require('../controllers/controllerAboutus')

router.get('/', ControllerAboutus.index)

module.exports = router