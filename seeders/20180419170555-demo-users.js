const R = require('ramda');
const casual = require('casual');

const generateFakeUsers = R.times(
  () => ({
    firstName: casual.first_name,
    lastName: casual.last_name,
    phone: casual.phone,
    age: casual.integer(18, 80),
    bio: casual.text,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', generateFakeUsers(1000), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
