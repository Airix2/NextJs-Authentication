module.exports = (sequelize, Sequelize) => {
    const ConversationsMembers = sequelize.define(
        "conversation_member",
        {
            userId: {
                type: Sequelize.UUID,
            },
            conversationId: {
                type: Sequelize.UUID,
            },
        },
        {
            tableName: "conversation_member",
        },
        {
            timestamps: true,
        }
    );

    return ConversationsMembers;
};
