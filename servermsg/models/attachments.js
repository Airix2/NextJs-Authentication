module.exports = (sequelize, Sequelize) => {
    const Attachments = sequelize.define(
        "attachment",
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
            downloadLink: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            messageId: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "attachment",
        },
        {
            timestamps: true,
        }
    );

    return Clients;
};
