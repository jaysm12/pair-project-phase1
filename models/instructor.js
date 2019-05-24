'use strict';
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.STRING,
    background: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Instructor.associate = function(models) {
    Instructor.hasMany(models.Student)
    Instructor.belongsToMany(models.Tag, {through: 'InstructorTag'})
  };

  Instructor.addHook('beforeSave', 'encryptPassword', (user, option) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
  })

  return Instructor;
};