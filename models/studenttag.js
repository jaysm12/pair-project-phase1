'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentTag = sequelize.define('StudentTag', {
    StudentId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  StudentTag.associate = function(models) {
    // associations can be defined here
  };
  return StudentTag;
};