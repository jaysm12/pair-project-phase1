const Models = require('../models')
const Student = Models.Student

class ControllerStudent {
  static indexGet(req,res) {
    
  }

  static indexPost(req,res) {
    
  }

  static editGet(req,res) {

  }

  static editPost(req,res) {
    
  }

  static registerGet(req,res) {
    Models.Tag.findAll({raw: true})
    .then(tags => {
      res.render('register_student.ejs', {
        tags: tags
      })
    })
  }

  static registerPost(req,res) {
    Student.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      birthday: req.body.birthday,
      motivation: req.body.motivation
    })
    .then(() => {
      return Student.findOne({
        where: {
          username: req.body.username
        }
      })
    })
    .then((student => {
      let studentId = student.dataValues.id
      let tagsId = req.body.tag
      let promises = tagsId.map(id => {
        Models.StudentTag.create({
          TagId: id,
          StudentId: studentId
        })
      })
      return Promise.all(promises)
    }))
    .then(() => {
      res.render('success_register')
    })
  }
}

module.exports = ControllerStudent