module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define(
        "images",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                unique: true,
            },
            downloadLink: {
                type: Sequelize.STRING,
            },
            messagesId: {
                type: Sequelize.INTEGER,
            },
            conversationsId: {
                type: Sequelize.UUID,
            },
        },
        {
            tableName: "images",
        },
        {
            timestamps: true,
        }
    );

    return Images;
};
