'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tasks',
      'eta',
      {
        type: Sequelize.DATE,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks', 'eta');
  }
};
