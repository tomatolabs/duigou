var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var Result = sequelize.define('Result',
    {
        id: {type: Sequelize.STRING(50), primaryKey: true},
        session_id: {type: Sequelize.STRING(50)},
        school_id:{type:Sequelize.STRING(50)},
        class_id:{type:Sequelize.STRING(50)},
        book_id:{type:Sequelize.STRING(50)},
        level1_code:{type:Sequelize.STRING(10)},
        stu_id:{type:Sequelize.STRING(50)},
        exercises_code:{type: Sequelize.STRING(50)},
        scores:{type: Sequelize.DECIMAL(5,1)},
        lesson: {type: Sequelize.INTEGER},
        create_time: {type: Sequelize.DATE},
        update_time: {type: Sequelize.DATE},
        creater_id: {type: Sequelize.STRING},
        creater_name: {type: Sequelize.STRING},
        updater_id: {type: Sequelize.STRING},
        updater_name: {type: Sequelize.STRING}
    },
    {
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        tableName: 't_result'
    }
);
module.exports = Result;