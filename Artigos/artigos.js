const Sequelize = require('sequelize');
const connection = require("../database/database")

const Artigos = connection.define('articles', { //criado uma nova tabela
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Artigos;