const Models = require('../models')
const bcrypt = require('bcryptjs')
class ControllerHome {
  static aboutusGet(req,res) {
    let input = {
      title: 'AboutUs',
      session: req.session.user || null
    }
    res.render('aboutus', input)
  }

  static index(req,res) {
    let input = {
      title: 'Home',
      session: req.session.user || null
    }
    res.render('home.ejs', input)
  }

  static register(req, res) {
    let input = {
      title: 'Home',
      session: req.session.user || null 
    }
    res.render('register.ejs', input)
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
    var input = {
      title: 'login',
      session: null
    }
    Model.findOne({ raw: true, where: { username: username } })
      .then((data) => {
        user = data
        console.log('hasil findOne nihh$$$$$$$$$$$$',user);
        
        if (!user) {
          input.message = ['warning', 'Username not found in our database']
          console.log('masuk sini ga yaaaaa',input);
          
          return Promise.reject(res.render('login', input));
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
          console.log(input);
          
          res.render('login', input);
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
            
  }

  static logoutGet(req,res) {
    if (req.session.user) {
      req.session.destroy();
      res.redirect('/login');
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = ControllerHome