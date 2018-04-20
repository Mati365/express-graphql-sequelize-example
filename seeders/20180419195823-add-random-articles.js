'use strict';
const R = require('ramda');
const casual = require('casual');

const generateFakeArticles = R.times(
  (index) => ({
    title: `Article ${casual.word} ${index}`,
    content: casual.text,
    UserId: (index % 100) + 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', generateFakeArticles(100), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
