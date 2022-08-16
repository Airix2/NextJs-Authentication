module.exports = (sequelize, Sequelize) => {
    const Groups = sequelize.define(
        "groups",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "groups",
        },
        {
            timestamps: true,
        }
    );

    return Groups;
};
