const express = require('express')
const router = express.Router()

const ControllerHome = require('../controllers/controllerHome')
const sessionChecker = require('../helpers/sessionCheckers')

router.get('/', ControllerHome.index)
router.get('/login', sessionChecker, ControllerHome.loginGet)
router.post('/login', ControllerHome.loginPost)
router.get('/logout', ControllerHome.logoutGet)

module.exports = router