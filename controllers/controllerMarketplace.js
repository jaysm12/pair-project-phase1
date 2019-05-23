const Models = require('../models')

class ControllerMarketplace {
  static index(req,res) {
    let input = {
      title: 'Profile',
      action: 'showData',
      dataInstructor: {
        name: 'Budi',
        username: 'budi123'
      },
      session: {
        id: 10,
        type: 'instructor'
      },
      dataInstructor: [{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },{
        id: 4,
        username: 'anto',
        background: 'loremipsum el dolor el passio fergussso',
        price: 1000000
      },]
    }
    res.render('marketplace', input)
  }
}

module.exports = ControllerMarketplace