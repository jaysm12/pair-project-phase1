const Models = require('../models')
const Instructor = Models.Instructor

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
      dataInstructor: {},
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
        input.dataInstructor = instructor
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