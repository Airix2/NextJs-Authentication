module.exports = (sequelize, Sequelize) => {
    const Clients = sequelize.define(
        "client",
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
            title: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "client",
        },
        {
            timestamps: true,
        }
    );

    return Clients;
};
