'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rules = sequelize.define('Rules', {
    description: DataTypes.STRING,
    topicRule: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Topics',
        key: 'rule',
        as: 'topicRule'
      }
    }
  }, {});
  Rules.associate = function(models) {
    Rules.belongsTo(models.Topic, {
      foreignKey: 'topicRule',
      onDelete: 'CASCADE'
    });
  };
  return Rules;
};