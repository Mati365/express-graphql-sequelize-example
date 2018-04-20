module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
      'User',
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        bio: DataTypes.TEXT,
        age: DataTypes.TINYINT,
        phone: DataTypes.STRING(15),
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      });

  User.associate = (models) => {
    User.Articles = User.hasMany(models.Article);
    User.Tasks = User.hasMany(models.Task);
  };

  return User;
};
