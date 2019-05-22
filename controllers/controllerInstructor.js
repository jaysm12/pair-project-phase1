const Models = require('../models')

class ControllerInstructor {
  static indexGet(req,res) {
    let instructorId = req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      id: instructorId,
      dataInstructor: {
        name: 'Budi',
        username: 'budi123'
      },
      dataStudentPending: [{
        username: 'anto',
        motivasi: 'loremipsum',
        status: 'pending'
      }],

      dataStudentAccept: [{
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
      action: 'edit',
      id: instructorId,
      dataInstructor: {
        nama: 'Budi',
        username: 'budi123'
      },
      dataStudentPending: [{
        username: 'anto',
        motivasi: 'loremipsum',
        status: 'pending'
      }],

      dataStudentAccept: [{
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