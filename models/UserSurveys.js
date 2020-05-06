const Sequelize = require('sequelize');
const db = require('../config/database');

const UserSurveys = db.define( 'users', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    hashedKey: {
        type: Sequelize.TEXT
    },
    data : {
        type: Sequelize.TEXT
    },
    done : {
        type: Sequelize.ENUM,
        values: ['0', '1']
    }      
});

module.exports = UserSurveys;