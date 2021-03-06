const express = require('express')
const router = express.Router()

const ControllerInstructor = require('../controllers/controllerInstructor')

router.get('/register', ControllerInstructor.registerGet)
router.post('/register', ControllerInstructor.registerPost)
router.get('/:id', ControllerInstructor.indexGet)
router.get('/:id/accept-student/:studentId', ControllerInstructor.acceptGet)
router.get('/:id/reject-student/:studentId', ControllerInstructor.rejectGet)
router.get('/:id/add-student/:studentId', ControllerInstructor.addStudentGet)
router.get('/:id/edit', ControllerInstructor.editGet)
router.post('/:id/edit', ControllerInstructor.editPost)

module.exports = router