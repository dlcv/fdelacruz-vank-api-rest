module.exports = (sequelize, type) => {
    var Bank = sequelize.define('client_bank', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bankId: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false
        }
    });

    return Bank;
}