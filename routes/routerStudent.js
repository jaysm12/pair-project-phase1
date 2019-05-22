const express = require('express')
const router = express.Router()

const ControllerStudent = require('../controller/controllerStudent')

router.get('/:id', ControllerStudent.indexGet)
router.post('/:id', ControllerStudent.indexPost)
router.get('/:id/edit', ControllerStudent.editGet)
router.post('/:id/edit', ControllerStudent.editPost)
router.get('/register', ControllerStudent.registerGet)
router.post('/register', ControllerStudent.registerPost)

module.exports = router