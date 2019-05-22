'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    motivation: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    InstructorId: DataTypes.INTEGER,
    accept_status: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.Instructor)
    Student.belongsToMany(models.Tag, {through: 'StudentTag'})

  };
  return Student;
};