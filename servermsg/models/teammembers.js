module.exports = (sequelize, Sequelize) => {
    const TeamMembers = sequelize.define(
        "teammembers",
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
            phonenumberId: {
                type: Sequelize.INTEGER,
            },
        },
        {
            tableName: "teammembers",
            timestamps: false,
        }
    );

    return TeamMembers;
};
