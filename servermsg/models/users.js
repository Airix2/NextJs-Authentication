module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
        "users",
        {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                unique: true,
            },
            firstname: {
                type: Sequelize.STRING,
            },
            lastname: {
                type: Sequelize.STRING,
            },
            fullname: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "users",
        },
        {
            timestamps: true,
        }
    );

    return Users;
};
