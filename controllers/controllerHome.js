const Models = require('../models')

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
      session: {}
    }
    res.render('login', input)
  }

  static loginPost(req,res) {
    let username = req.body.username
    let password = req.body.password
    let userType = req.body.userType
    let Model = (userType == 'instructor') ? Models.Instructor : (userType == 'student') ? Models.Student : null
    Model.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        input.message = ['warning', 'Username not found in our database']
        res.render('login', input);
      } else if (user.password !== password) {
        input.message = ['warning', 'Invalid Password']
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
      }
    });
            
  }

  static logoutGet(req,res) {
    
  }
}

module.exports = ControllerHome