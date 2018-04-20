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
        phone: DataTypes.STRING(15)
      });

  User.associate = (models) => {
    User.hasMany(models.Article);
    User.hasMany(models.Task);
  };

  return User;
};
