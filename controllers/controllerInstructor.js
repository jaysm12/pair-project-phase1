const Models = require('../models')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let msg = {
  to: '',
  from: 'admin@mpu.com',
  subject: '',
  text: '',
  html: '',
};

class ControllerInstructor {
  static indexGet(req,res) {
    let instructorId = +req.params.id
    let input = {
      title: 'Profile',
      action: 'showData',
      type: 'instructor',
      session: req.session.user,
      dataProfile: {},
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
        input.dataProfile = instructor
        let pendingStudent = Models.Student.findAll({
          raw: true, 
          where: {
            InstructorId: instructorId, 
            accept_status: false
          },
          attributes: includeStudent
        })
        let acceptStudent = Models.Student.findAll({
          raw: true, 
          where: {
            InstructorId: instructorId, 
            accept_status: true
          },
          attributes: includeStudent,
        })
        return Promise.all([pendingStudent, acceptStudent])
      })
      .then((values) => {
        console.log('di profilePagee#################3', input.session);
        console.log('data instruktor',input.dataProfile);
        
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
      dataProfile: {},
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
        input.dataProfile = instructor
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
    let promiseInstructor = Models.Instructor.findOne({where: {id: instructorId}})
    let promiseUpdate = Models.Student.update({accept_status: true}, {
      where: {
        id: studentId
      }, 
      returning: true, 
      plain: true,
      raw:true
    })
    Promise.all([promiseInstructor, promiseUpdate])
      .then((values)=> {
        let instructor = values[0]
        let student = values[1][1]
        console.log('ini data student',student);
        msg.to = student.email
        msg.subject = `Mpu ${instructor.name} has accepted your request! `
        msg.text = `Congratulation your application to Mpu ${instructor.name} is accepted. Go contact your Mpu and start learning. Happy Coding!`
        msg.html = msg.message     
        console.log(msg);
        return sgMail.send(msg);
      })
      .then(() => {
        let url = `/${req.session.user.userType}/${req.session.user.userId}`
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
    let promiseInstructor = Models.Instructor.findOne({where: {id: instructorId}})
    let promiseStudent = Models.Student.update({InstructorId: null}, {
      where: {
        id: studentId
      }, 
      returning: true, 
      plain: true,
      raw: true,
    })
    Promise.all([promiseInstructor, promiseStudent])
      .then((values)=> {
        let instructor = values[0]
        let student = values[1][1]
        console.log('ini data student',student);
        
        msg.to = student.email
        msg.subject = `Sorry, Mpu ${instructor.name} has rejected your request`
        msg.text = `Mpu ${instructor.name} has rejected your request. But don't worry! We still have thousand of instructor to be chosen! Never give up!`
        msg.html = msg.message
        return sgMail.send(msg);
      })
      .then(() => {
        let url = `/${req.session.user.userType}/${req.session.user.userId}`
        res.redirect(url)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }

  static addStudentGet(req,res) {
    let studentId = req.params.studentId
    let instructorId = req.params.id
    Models.Student.update({
      InstructorId: instructorId
    }, {
      where: {
        id: studentId
      }
    })
      .then(() => {
        res.redirect(`/instructor/${instructorId}`)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = ControllerInstructor