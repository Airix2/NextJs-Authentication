module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define(
        "messages",
        {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                unique: true,
            },
            text: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            senderId: {
                type: Sequelize.UUID,
            },
            receiverId: {
                type: Sequelize.UUID,
            },
            imagesId: {
                type: Sequelize.INTEGER,
            },
            attachmentsId: {
                type: Sequelize.INTEGER,
            },
            conversationsId: {
                type: Sequelize.UUID,
            },
            fromNumber: {
                type: Sequelize.STRING,
            },
            toNumber: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "messages",
        },
        {
            timestamps: true,
        }
    );

    return Messages;
};
