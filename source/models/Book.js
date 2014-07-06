var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var Book = sequelize.define('Book',
    {
        id: {type: Sequelize.STRING, primaryKey: true},
        code: {type: Sequelize.STRING},
        name: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING},
        create_time: {type: Sequelize.DATE},
        update_time: {type: Sequelize.DATE},
        creater_id: {type: Sequelize.STRING},
        creater_name: {type: Sequelize.STRING},
        updater_id: {type: Sequelize.STRING},
        updater_name: {type: Sequelize.STRING},
        expires_in: {type: Sequelize.DATE}
    },
    {
        tableName: 't_book'
    }
);
module.exports = Book;