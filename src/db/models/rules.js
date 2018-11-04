'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rules = sequelize.define('Rules', {
    description: DataTypes.STRING,
    topicId: {
    	type: DataTypes.STRING,
    	onDelete: "CASCADE",
    	references: {
    		model: "Topic",
    		key: "id",
    		as: "topicId",
    	}
    }
  }, {});
  Rules.associate = function(models) {
    // associations can be defined here
    Rules.belongsTo(models.Topic, {
    	foreignKey: "topicId",
    	onDelete: "CASCADE",
    });
  };
  return Rules;
};