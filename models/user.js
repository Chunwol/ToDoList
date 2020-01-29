module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    });

    //user.associate = (models) => {
    //   user.hasMany(models.reply);
    //};

    return user;
}