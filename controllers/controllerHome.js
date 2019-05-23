const Models = require('../models')
// const bycrpt = require('bcryptjs')
class ControllerHome {
  static index(req,res) {
    
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
    Model.findOne({ raw:true, where: { username: username } })
      .then((user) => {
        let input = {
          title: 'login',
          session: {}
        }
        if (!user) {
          input.message = ['warning', 'Username not found in our database']
          res.render('login', input);
          // bcrypt.compareSync("B4c0/\/", hash);
        } else if (user.password !== password) {
          input.message = ['warning', 'Invalid Password']
          res.redirect('/login');
        } else {
          req.session.user = {
            userId: user.id,
            userType: userType,
          };
          let url = `/${userType}/${user.id}`
          res.redirect(url);
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