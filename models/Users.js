const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define( 'users', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING
    },   
    password: {
        type: Sequelize.STRING
    },
    hashedKeys: {
        type: Sequelize.TEXT
    },   
    anotherHashedKeys: {
        type: Sequelize.TEXT
    },     
});

module.exports = Users;