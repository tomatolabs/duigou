var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var LevelSum = sequelize.define('LevelSum',
    {
        id: {type: Sequelize.STRING(50), primaryKey: true},
        school_id:{type:Sequelize.STRING(50)},
        class_id:{type:Sequelize.STRING(50)},
        lesson: {type: Sequelize.INTEGER},
        level1_code:{type:Sequelize.STRING(10)},
        stu_id:{type:Sequelize.STRING(50)},
        scores:{type: Sequelize.DECIMAL(5,1)},
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
        tableName: 't_score_sum_level1'
    }
);
module.exports = LevelSum;