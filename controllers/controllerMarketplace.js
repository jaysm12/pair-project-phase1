const Models = require('../models')

class ControllerMarketplace {
  static index(req,res) {
    let input = {
      title: 'Marketplacec',
      session: req.session.user,
      dataInstructor: []
    }

    Models.Instructor.findAll({
      raw: true,
      attributes: ['id', 'name', 'background', 'price'],
    })
      .then((teachers) => {
        console.log(teachers);
        
        input.dataInstructor = teachers
        res.render('marketplace', input)
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      })
    
  }
}

module.exports = ControllerMarketplace