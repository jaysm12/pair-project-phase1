const Models = require('../models')
const Instructor = Models.Instructor

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
    Models.Tag.findAll({raw: true})
    .then(tags => {
      res.render('register_instructor.ejs', {
        tags: tags
      })
    })
  }

  static registerPost(req,res) {
    Instructor.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      birthday: req.body.birthday,
      background: req.body.background,
      price: req.body.price
    })
    .then(() => {
      return Instructor.findOne({
        where: {
          username: req.body.username
        }
      })
    })
    .then((instructor => {
      let instructorId = instructor.dataValues.id
      let tagsId = req.body.tag
      let promises = tagsId.map(id => {
        Models.InstructorTag.create({
          TagId: id,
          InstructorId: instructorId
        })
      })
      return Promise.all(promises)
      
    }))
    .then(() => {
      res.render('success_register')
    })
  }
}

module.exports = ControllerInstructor