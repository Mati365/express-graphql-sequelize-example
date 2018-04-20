'use strict';
const R = require('ramda');
const casual = require('casual');

const generateFakeTasks = R.times(
  (index) => ({
    title: `Task ${casual.word} ${index}`,
    UserId: (index % 100) + 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', generateFakeTasks(100), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
