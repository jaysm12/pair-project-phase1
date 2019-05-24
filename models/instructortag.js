'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstructorTag = sequelize.define('InstructorTag', {
    InstructorId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  InstructorTag.associate = function(models) {
    // associations can be defined here
    InstructorTag.belongsTo(models.Instructor)
    InstructorTag.belongsTo(models.Tag)
  };
  return InstructorTag;
};