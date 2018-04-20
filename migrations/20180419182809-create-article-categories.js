'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.createTable('ArticleCategories', {
        ArticleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Articles',
            key: 'id',
          },
        },
        CategoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Categories',
            key: 'id',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),

      queryInterface.addConstraint('ArticleCategories', ['ArticleId', 'CategoryId'], {
        type: 'primary key',
        name: 'category_primary_constraint',
      }),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ArticleCategories');
  }
};
