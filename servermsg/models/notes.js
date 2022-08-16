module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define(
        "notes",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                unique: true,
            },
            text: {
                type: Sequelize.STRING,
            },
            usersId: {
                type: Sequelize.UUID,
            },
            conversationsId: {
                type: Sequelize.UUID,
            },
        },
        {
            tableName: "notes",
        },
        {
            timestamps: true,
        }
    );

    return Notes;
};
