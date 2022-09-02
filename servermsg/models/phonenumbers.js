module.exports = (sequelize, Sequelize) => {
    const Phonenumbers = sequelize.define(
        "phonenumbers",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                unique: true,
            },
            phonenumber: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
        },
        {
            tableName: "phonenumbers",
            timestamps: false,
        }
    );

    return Phonenumbers;
};
