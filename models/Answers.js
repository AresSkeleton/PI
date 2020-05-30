const Sequelize = require('sequelize');
const db = require('../config/database');

const Answers = db.define( 'answers', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    key: {
        type: Sequelize.TEXT
    },   
    name: {
        type: Sequelize.STRING
    },    
    data: {
        type: Sequelize.TEXT
    },   
});

module.exports = Answers;