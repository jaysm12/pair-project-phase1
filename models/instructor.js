'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    background: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Instructor.associate = function(models) {
    Instructor.hasMany(models.Student)
    Instructor.belongsToMany(models.Tag, {through: 'InstructorTag'})
  };
  return Instructor;
};