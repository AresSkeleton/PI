const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define( 'users', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },    
});

module.exports = Users;