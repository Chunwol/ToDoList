module.exports = (sequelize, DataTypes) => {
    const todos = sequelize.define('todos', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //unique: true,
        },
        Contents: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    todos.associate = models => {
        todos.belongsTo(models.user, {
          foreignKey: "userid"
        })
    };
    return todos;
}