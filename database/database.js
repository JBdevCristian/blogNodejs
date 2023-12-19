const Sequelize = require('sequelize');

const connection = new Sequelize('guiaPress', 'root', '23268265', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;