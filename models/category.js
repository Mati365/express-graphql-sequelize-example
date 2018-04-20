'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {});

  Category.associate = (models) => {
    models.Article.Categories = models.Article.belongsToMany(
      Category,
      {through: 'ArticleCategories'});

    Category.belongsToMany(
      models.Article,
      {through: 'ArticleCategories'});
  };

  return Category;
};
