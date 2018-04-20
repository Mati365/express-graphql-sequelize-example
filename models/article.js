const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
      'Article',
      {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
      },
      {});

  Article.associate = (models) => {
    Article.belongsTo(models.User);
  };

  return Article;
};
