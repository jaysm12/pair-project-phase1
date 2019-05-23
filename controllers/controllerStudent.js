const Models = require('../models')

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
    
  }

  static registerPost(req,res) {
    
  }
}

module.exports = ControllerStudent