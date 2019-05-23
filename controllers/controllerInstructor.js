const Models = require('../models')

class ControllerInstructor {
  static indexGet(req,res) {
    let instructorId = req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      session: {
        id: 10,
        type: 'instructor'
      },
      dataInstructor: {
        id: instructorId,
        name: 'Budi',
        username: 'budi123'
      },
      dataStudentPending: [{
        id: 1,
        username: 'anto',
        motivasi: 'loremipsum',
        status: 'pending'
      }],

      dataStudentAccept: [{
        id: 2,
        username: 'siapa kamu',
        motivasi: 'loremipsum lerem ipsum dolor et labora',
        status: 'accept'
      }]
    }
    res.render('profile', input)
  }

  static indexPost(req,res) {

  }

  static editGet(req,res) {
    let instructorId = req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      session: {
        id: 10,
        type: 'instructor'
      },
      dataInstructor: {
        id: instructorId,
        name: 'Budi',
        username: 'budi123'
      },
      dataStudentPending: [{
        id: 1,
        username: 'anto',
        motivasi: 'loremipsum',
        status: 'pending'
      }],

      dataStudentAccept: [{
        id: 2,
        username: 'siapa kamu',
        motivasi: 'loremipsum lerem ipsum dolor et labora',
        status: 'accept'
      }]
    }
    res.render('profile', input)
  }

  static editPost(req,res) {
    
  }

  static registerGet(req,res) {
    
  }

  static registerPost(req,res) {
    
  }
}

module.exports = ControllerInstructor