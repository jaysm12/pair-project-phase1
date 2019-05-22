'use strict';
let faker = require('faker')
var randomBirthday = require('random-birthday');
// ['javascript', 'python', 'ruby', 'golang', 'java', 'html/CSS', 'react', 'fullstack', 'viu', 'webdesign', 'ui/ux designer']
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [{
        name: 'Javascript',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Python',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ruby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Golang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Java',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Html/css',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'React',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fullstack',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Viu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Web design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'UI/UX designer',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
