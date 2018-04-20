module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
      'Task',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        eta: DataTypes.DATE,
      },
      {});

  Task.associate = (models) => {
    Task.belongsTo(models.User);
  };

  return Task;
};
