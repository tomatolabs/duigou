var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var Exercises = sequelize.define('Exercises',
    {
        id: {type: Sequelize.STRING, primaryKey: true},
        book_id:{type:Sequelize.STRING},
        chapter_code:{type:Sequelize.STRING},
        chapter_num:{type:Sequelize.STRING},
        chapter_name:{type:Sequelize.STRING},
        level1_code:{type:Sequelize.STRING},
        level1_num:{type:Sequelize.STRING},
        level1_name:{type:Sequelize.STRING},
        level1_start:{type:Sequelize.INTEGER},
        level2_code:{type:Sequelize.STRING},
        level2_name:{type:Sequelize.STRING},
        exercises_code:{type:Sequelize.STRING},
        exercises_num:{type:Sequelize.STRING},
        exercises_name:{type:Sequelize.STRING},
        exercises_start:{type:Sequelize.INTEGER},
        exercises_type:{type:Sequelize.STRING},
        create_time:{type:Sequelize.DATE},
        update_time:{type:Sequelize.DATE},
        creater_id:{type:Sequelize.STRING},
        creater_name:{type:Sequelize.STRING},
        updater_id:{type:Sequelize.STRING},
        updater_name: {type: Sequelize.STRING}
    },
    {
        tableName: 't_exercises'
    }
);
module.exports = Exercises;