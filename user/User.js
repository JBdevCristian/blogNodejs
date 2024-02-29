const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Sincronizando tabela no MYSQL para que seja criado
/*User.sync({force: false}).then(() => {
    console.log("tabela criada com sucesso.")
});*/

module.exports = User;