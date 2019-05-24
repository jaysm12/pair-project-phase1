const Models = require('../models')
const Student = Models.Student

class ControllerStudent {
  static indexGet(req,res) {
    let studentId = +req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      type: 'student',
      session: req.session.user,
      dataProfile: {},
      dataMpu: {}
    }
    console.log('masuk indexGetttt');
    
    Models.Student.findOne({
        raw: true,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'accept_status']
        }, 
        where: {
          id: studentId
        }}) 
      .then((student) => {
        input.dataProfile = student
        return Models.Instructor.findOne({
          raw:true, 
          where: {
            id: student.InstructorId
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
        })
      })
      .then((instructor) => {
        input.dataMpu = instructor
        console.log('inputstudent cuyyyy',input);
        res.render('profile', input)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }

  static indexPost(req,res) {
    
  }

  static editGet(req,res) {
    let studentId = req.params.id
    let input = {
      title: 'Profile',
      action: 'edit',
      type: 'student',
      session: req.session.user,
      dataProfile: {},
      dataMpu: {}
    }
    Models.Student.findOne({
      raw: true,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }, 
      where: {
        id: studentId
      }})
      .then((student) => {
        input.dataProfile = student
        return Models.Instructor.findOne({
          raw:true, 
          where: {
            id: student.InstructorId
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
        })
      })
      .then((instructor) => {
        input.dataMpu = instructor
        res.render('profile', input)
      })
  }

  static editPost(req,res) {
    console.log('masuk edit post cuyyy', req.body);
    Models.Instructor.update(req.body, {where: {id: req.params.id}})
      .then((data) => {
        let url = `/${req.session.user.userType}/${req.session.user.userId}`
        res.redirect(url)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }

  static registerGet(req,res) {
    Models.Tag.findAll({raw: true})
    .then(tags => {
      res.render('register_student.ejs', {
        tags: tags,
        session: null
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
      res.render('success_register', {session: null})
    })
  }
}

module.exports = ControllerStudent