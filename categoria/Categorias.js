const Sequelize = require('sequelize');
const connection = require("../database/database")

const Categorias = connection.define('categories', { //criado uma nova tabela
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Categorias;