const express = require('express')
const router = express.Router()

const ControllerStudent = require('../controllers/controllerStudent')

router.get('/register', ControllerStudent.registerGet)
router.post('/register', ControllerStudent.registerPost)
router.get('/:id', ControllerStudent.indexGet)
router.post('/:id', ControllerStudent.indexPost)
router.get('/:id/edit', ControllerStudent.editGet)
router.post('/:id/edit', ControllerStudent.editPost)

module.exports = router