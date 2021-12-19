module.exports = (sequelize, type) => {
    var Client = sequelize.define("client", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: type.STRING(50),
            allowNull: false,
            unique: {
                msg: "companyName should be unique"
            }
        },
        internalCode: {
            type: type.STRING(10),
            allowNull: false,
            unique: {
                msg: "internalCode should be unique"
            }
        },
        taxId: {
            type: type.STRING(10),
            allowNull: false,
            unique: {
                msg: "taxId should be unique"
            }
        },
        currency: {
            type: type.STRING(3),
            allowNull: false
        },
        apiQuota: {
            type: type.INTEGER.UNSIGNED,
            allowNull: false
        }
    });

    return Client;
}