const express = require('express')
const router = express.Router()

const ControllerHome = require('../controllers/controllerHome')

router.get('/', ControllerHome.index)
router.get('/register', ControllerHome.register)
router.get('/login', ControllerHome.loginGet)
router.post('/login', ControllerHome.loginPost)
router.get('/logout', ControllerHome.logoutGet)

module.exports = router