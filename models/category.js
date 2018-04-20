'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {});

  Category.associate = (models) => {
    models.Article.belongsToMany(
      Category,
      {through: 'ArticleCategories'});

    Category.belongsToMany(
      models.Article,
      {through: 'ArticleCategories'});
  };

  return Category;
};
