const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'k53s2corei7', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;