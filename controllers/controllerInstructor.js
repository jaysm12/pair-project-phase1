const Models = require('../models')
const Instructor = Models.Instructor

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
      dataStudentAccept: [],
      listTags: []
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
<<<<<<< HEAD
=======
        console.log('di profilePagee#################3', input.session);
        console.log('data instruktor',input.dataProfile);
        
>>>>>>> robbycp
        [input.dataStudentPending, input.dataStudentAccept] = values
        return Instructor.findByPk(instructorId, {
          include: {
            model: Models.Tag
          }
        })
      })
      .then(instructor =>{
        let tags = instructor.Tags
        for(let i = 0; i < tags.length; i++) {
          input.listTags.push(tags[i].dataValues.name)
        }
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
      dataStudentAccept: [],
      listTags: []
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