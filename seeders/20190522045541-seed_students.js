'use strict';
let faker = require('faker')
var randomBirthday = require('random-birthday');
// ['javascript', 'python', 'ruby', 'golang', 'java', 'html/CSS', 'react', 'fullstack', 'viu', 'webdesign', 'ui/ux designer']
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        birthday: randomBirthday({ min: 1980, max: 2000 }),
        motivation: faker.lorem.sentence(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat().split('-').join(''),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};