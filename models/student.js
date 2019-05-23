'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    motivation: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    InstructorId: DataTypes.INTEGER,
    accept_status: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.Instructor)
    Student.belongsToMany(models.Tag, {through: 'StudentTag'})

  };

  Student.addHook('beforeSave', 'encryptPassword', (user, option) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
  })

  return Student;
};