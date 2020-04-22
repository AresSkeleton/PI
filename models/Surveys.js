const Sequelize = require('sequelize');
const db = require('../config/database');

const Surveys = db.define( 'surveys', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    key: {
        type: Sequelize.STRING
    },   
    name: {
        type: Sequelize.STRING
    },    
    data: {
        type: Sequelize.TEXT
    },   
});

module.exports = Surveys;