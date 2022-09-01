module.exports = (sequelize, Sequelize) => {
    const Teams = sequelize.define(
        "teams",
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
            tableName: "teams",
            timestamps: true,
        }
    );

    return Teams;
};
