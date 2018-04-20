'use strict';
const R = require('ramda');
const casual = require('casual');

const generateFakeCategories = R.times(
  (index) => ({
    ArticleId: index % 100 + 2,
    CategoryId: (index % 100) + 202,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ArticleCategories', generateFakeCategories(70), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArticleCategories', null, {});
  }
};
