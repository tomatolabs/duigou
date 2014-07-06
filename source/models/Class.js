var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var Class = sequelize.define('Class',
    {

        id: {type: Sequelize.BIGINT, primaryKey: true},
        school_id: {type: Sequelize.STRING},
        school_name: {type: Sequelize.STRING},
        lesson: {type: Sequelize.INTEGER},
        class_code: {type: Sequelize.STRING},
        class_name: {type: Sequelize.STRING},
        book_id: {type: Sequelize.STRING},
        student_status: {type: Sequelize.STRING},
        create_time: {type: Sequelize.DATE},
        update_time: {type: Sequelize.DATE},
        creater_id: {type: Sequelize.STRING},
        creater_name: {type: Sequelize.STRING},
        updater_id: {type: Sequelize.STRING},
        updater_name: {type: Sequelize.STRING}
    },
    {
        createdAt:false,
        updatedAt:false,
        tableName: 't_class'
    }
);
module.exports = Class;