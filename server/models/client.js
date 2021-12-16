module.exports = (sequelize, type) => {
    return sequelize.define('client', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_name: {
            type: type.STRING(50),
            allowNull: false
        },
        internal_code: {
            type: type.STRING(10),
            allowNull: false
        },
        tax_id: {
            type: type.STRING(10),
            allowNull: false
        },
        currency: {
            type: type.STRING(3),
            allowNull: false
        },
        api_quota: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false
        }
    })
}