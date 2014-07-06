var logger = require('../commons/logging').logger;
var util = require('util');
var PageInput = require('./common/PageInput');

module.exports = function (app) {
    var mode = app.get('env') || 'development';
    var asseton = require('../middlewares/asseton')(mode);

    var indexPage = function (req, res, next) {
        asseton(req, res);
        var input = PageInput.i();
        input.user = {};
        res.render('index', input);
    };
    app.get('/', indexPage);
    app.get('/timesheets', function(req, res, next){
        asseton(req, res);
        var input = PageInput.i();
        input.user = {};
        res.render('timesheets', input);

    });


};