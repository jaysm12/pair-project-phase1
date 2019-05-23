const express = require('express')
const router = express.Router()

const ControllerInstructor = require('../controllers/controllerInstructor')

router.get('/register', ControllerInstructor.registerGet)
router.post('/register', ControllerInstructor.registerPost)
router.get('/:id', ControllerInstructor.indexGet)
router.post('/:id', ControllerInstructor.indexPost)
router.get('/:id/edit', ControllerInstructor.editGet)
router.post('/:id/edit', ControllerInstructor.editPost)

module.exports = router