module.exports = (sequelize, Sequelize) => {
    const GroupsMembers = sequelize.define(
        "groups_members",
        {
            groupId: {
                type: Sequelize.INTEGER,
            },
            usersId: {
                type: Sequelize.UUID,
            },
        },
        {
            tableName: "groups_members",
        },
        {
            timestamps: true,
        }
    );

    return GroupsMembers;
};
