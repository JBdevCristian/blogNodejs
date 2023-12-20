const Sequelize = require('sequelize');
const connection = require("../database/database");
const Category = require('../categoria/categorias');

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

Category.hasMany(Artigos) //hasMany deininfo 1-p-M
Artigos.belongsTo(Category) //belongsTo definindo 1-p-1


module.exports = Artigos;