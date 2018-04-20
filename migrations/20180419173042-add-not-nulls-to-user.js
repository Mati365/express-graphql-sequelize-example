'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Users',
        'firstName',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.changeColumn(
        'Users',
        'lastName',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Users',
        'firstName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.changeColumn(
        'Users',
        'lastName',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ];
  }
};
