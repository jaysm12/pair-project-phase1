const Models = require('../models')
const bcrypt = require('bcryptjs')
class ControllerHome {
  static index(req,res) {
    res.render('home.ejs')
  }

  static register(req, res) {
    res.render('register.ejs')
  }

  static loginGet(req,res) {
    let input = {
      title: 'login',
      session: null,
      message: [null, null]
    }
    res.render('login', input)
  }

  static loginPost(req,res) {
    let username = req.body.username
    let password = req.body.password
    let userType = req.body.userType
    let Model = (userType == 'instructor') ? Models.Instructor : (userType == 'student') ? Models.Student : null
    let user
    Model.findOne({ where: { username: username } })
      .then((data) => {
        user = data.dataValues
        var input = {
          title: 'login',
          session: {}
        }
        if (!user) {
          input.message = ['warning', 'Username not found in our database']
          res.render('login', input);
        } else {
          return bcrypt.compare(password, user.password)
        } 
      })
      .then(check => {
        if(check){
          req.session.user = {
            userId: user.id,
            userType: userType,
          };
          let url = `/${userType}/${user.id}`
          console.log(url);
          res.redirect(url);
        } else {
          input.message = ['warning', 'Invalid Password']
          res.redirect('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
            
  }

  static logoutGet(req,res) {
    
  }
}

module.exports = ControllerHome