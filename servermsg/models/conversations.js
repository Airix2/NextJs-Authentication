module.exports = (sequelize, Sequelize) => {
    const Conversations = sequelize.define(
        "conversation",
        {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                unique: true,
            },
            clientId: {
                type: Sequelize.UUID,
            },
            userId: {
                type: Sequelize.UUID,
            },
            notesId: {
                type: Sequelize.INTEGER,
            },
            isGroupConversation: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: "conversation",
        },
        {
            timestamps: true,
        }
    );

    return Conversations;
};
