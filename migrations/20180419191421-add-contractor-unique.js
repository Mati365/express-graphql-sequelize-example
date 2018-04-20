'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Categories',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Categories',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: true,
          unique: false,
        },
      ),
    ];
  }
};
