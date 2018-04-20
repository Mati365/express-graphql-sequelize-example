'use strict';
const R = require('ramda');
const casual = require('casual');

const generateFakeUsers = R.times(
  (index) => ({
    name: `${casual.word}${index}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', generateFakeUsers(100), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
