module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
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
}