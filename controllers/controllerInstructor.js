const Models = require('../models')

class ControllerInstructor {
  static indexGet(req,res) {
    let instructorId = +req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      type: 'instructor',
      session: req.session.user,
      dataInstructor: {},
      headerStudent: [],
      dataStudentPending: [],
      dataStudentAccept: []
    }
    let includeStudent = ['id', 'name', 'birthday', 'motivation', 'email', 'phone', 'accept_status']
    Models.Student.describe()
      .then((val) => {
        input.headerStudent = Object.keys(val).filter((x) => {
          if (includeStudent.indexOf(x) > -1) {
            return true
          }
        })
        // console.log(val);
        return Models.Instructor.findOne({
          raw: true,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
          }, 
          where: {
            id: instructorId
          }}) 
      })
      .then((instructor) => {
        input.dataInstructor = instructor
        let pendingStudent = Models.Student.findAll({
          raw: true, 
          where: {
            InstructorId: instructorId, 
            accept_status: false
          },
          attributes: {exclude: includeStudent.slice(1)}
        })
        let acceptStudent = Models.Student.findAll({
          raw: true, 
          where: {
            InstructorId: instructorId, 
            accept_status: true
          },
          attributes: {exclude: includeStudent.slice(1)},
        })
        return Promise.all([pendingStudent, acceptStudent])
      })
      .then((values) => {
        console.log('di profilePagee#################3', input.session);
        console.log('data instruktor',input.dataInstructor);
        
        [input.dataStudentPending, input.dataStudentAccept] = values
        // console.log(input);
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
    let instructorId = req.params.id
    let input = {
      title: 'Profile',
      action: 'edit',
      type: 'instructor',
      session: req.session.user,
      dataInstructor: {},
      headerStudent: [],
      dataStudentPending: [],
      dataStudentAccept: []
    }
    Models.Instructor.findOne({
      raw: true,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }, 
      where: {
        id: instructorId
      }})
      .then((instructor) => {
        input.dataInstructor = instructor
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

  static acceptGet(req,res) {
    let studentId = req.params.studentId
    let instructorId = req.params.id
    Models.Student.update({InstructorId: null}, {where: {id: studentId}})
      .then(()=> {
        let url = `/${req.session.user.userType}/${req.session.user.userId}`
        console.log('url di accpetGet##############',url);
        res.redirect(url)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }

  static rejectGet(req,res) {
    let studentId = req.params.studentId
    let instructorId = req.params.id
    Models.Student.update({InstructorId: instructorId}, {where: {id: studentId}})
      .then(()=> {
        let url = `/${req.session.user.userType}/${req.session.user.userId}`
        console.log('url di accpetGet##############',url);
        res.redirect(url)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = ControllerInstructor