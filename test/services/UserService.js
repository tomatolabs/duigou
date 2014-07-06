var idGenerator = require('../../source/commons/id');
var UserService = require('../../source/services/UserService');
var logger = require('../../source/commons/logging').logger;
var toSSOGetDataService = require('../../source/services/ToSSOGetDataService');
var request = require('request');
var webservice = require('../../settings').webService;
var crypto = require('crypto');
exports.setUp = function(done){
//    setTimeout(function(){done();}, 1000);
    console.info('test is starting');
    done();
};
exports.tearDown = function(done){
    console.info('done;');
    done()
};


var getMd5 = function(str){
    var md5 = crypto.createHash('md5').update(str).digest('hex');
    return md5.toUpperCase();
}

var callWebService = function(url,condition,callback){
    request({
        method: 'post',
        url: url,
        form: condition
    }, function (err, resp, ret) {
        ret = JSON.parse(ret);
        if (ret.State === 1) {
            console.info(ret);
//            callback(null,ret.Data);
        } else {
            throw new Error(ret.Error);
        }
    });
}

exports.testLoadById = function(test){
    var json={
        schoolId:1,
        studentCode:'BJ78550'
    };
    var str = (
        "method="+webservice.getClassesByStudentMethod+
        "&appid="+webservice.appid+
        "&schoolId="+json.schoolId+
        "&studentCode="+json.studentCode+
        "&classCodeOrName="+(json.classCodeOrName ? json.classCOdeOrName : "")+
        "&classStatus="+(json.classStatus ? json.classStatus : 3)+
        "&pageIndex="+(json.pageIndex ? json.pageIndex : 1)+
        "&pageSize="+(json.pageSize ? json.pageSize : 1000)+
        "&appKey="+webservice.appKey).toLowerCase();
    var md5 = getMd5(str);
    var condition = {
        method : webservice.getClassesByStudentMethod,
        appid : webservice.appid,
        schoolid : json.schoolId,
        studentcode : json.studentCode,
        classcodeorname : json.classCodeOrName ? json.classCOdeOrName : null,
        classstatus : json.classStatus ? json.classStatus : 3,
        pageindex:json.pageIndex ? json.pageIndex : 1,
        pagesize:json.pageSize ? json.pageSize : 1000};
    condition.sign=md5;
    callWebService(webservice.classPostUrl,condition,function(){});
    test.done();

};
//exports.testCreateUserFromOAuth = function(test){
//    /*
//    var userJson = {
//        id: idGenerator.get('User').toId(),
//        displayName: 'tom',
//        accessToken: '111'
//    };
//
//    UserService.createFromOAuth(userJson, function(err, user){
//        if(err){
//            test.ok(false);
//        }
//        else{
//            test.ok(true);
//            console.log(user);
//        }
//        test.done();
//    });
//    */
//    test.done();
//};