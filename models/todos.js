module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todos', {
        userid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        Contents: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}