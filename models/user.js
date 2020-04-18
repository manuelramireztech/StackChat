// need to npm i this package
const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    user.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    user.addHook("beforeCreate", function(user){
        user.password =bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return user;

};