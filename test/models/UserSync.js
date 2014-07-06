
var User = require('../../source/models/User');

exports.setUp = function(done){
    console.info('test is starting');
    done();
};
exports.tearDown = function(done){
    done()
};


exports.testSync = function(test){
    User.sync();
};