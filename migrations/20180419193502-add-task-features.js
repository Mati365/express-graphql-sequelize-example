'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Tasks',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),

      queryInterface.addColumn(
        'Tasks',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn(
        'Tasks',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.removeColumn('Tasks', 'UserId'),
    ];
  }
};
