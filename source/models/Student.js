var Sequelize = require('sequelize');
var sequelize = require('../commons/sequelize');
var typeRegistry = require('./TypeRegistry');

var Student = sequelize.define('Student',
    {
        id: {type: Sequelize.STRING, primaryKey: true},
        school_id:{type:Sequelize.STRING},
        school_name:{type:Sequelize.STRING},
        class_id:{type:Sequelize.STRING},
        class_name:{type:Sequelize.STRING},
        stu_number:{type:Sequelize.STRING},
        seat:{type:Sequelize.STRING},
        name:{type:Sequelize.STRING},
        phone:{type:Sequelize.STRING},
        lift_flag: {
            type: Sequelize.ENUM,
            values: typeRegistry.LifeFlag.valueList(),
            defaultValue: typeRegistry.LifeFlag.Active.value()
        },
        create_time:{type:Sequelize.DATE},
        update_time:{type:Sequelize.DATE},
        creater_id:{type:Sequelize.STRING},
        creater_name:{type:Sequelize.STRING},
        updater_id: {type: Sequelize.STRING},
        updater_name: {type: Sequelize.STRING}
    },
    {
        createdAt:false,
        updatedAt:false,
        tableName: 't_student'
    }
);
module.exports = Student;