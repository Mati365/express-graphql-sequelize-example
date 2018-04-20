'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Users',
        'age',
        {
          type: Sequelize.TINYINT,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'phone',
        {
          type: Sequelize.STRING(15),
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'age'),
      queryInterface.removeColumn('Users', 'phone')
    ];
  }
};
