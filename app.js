var express = require('express'),
    favicon = require('serve-favicon'),
    config = require('config'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressValidator = require('express-validator'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    UserModel = require("./models/user");
router = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator([]))
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(config.get('mongodb.url'));
// Middleware Authentication
app.all('/api/v1/*', function(req, res, next) {
    var token = req.get('X-Auth-Token')
    var errors = req.validationErrors();
    if (errors) {
        res.send({
            "errors": errors
        }, 400);
        return;
    }
    var user = UserModel.findOne({
        "session_token": token
    }, function(err, user) {
        if (err) return handleError(err);
        if (user) {
            next();
        } else {
            res.send({
                "errors": ["No valid token"]
            }, 401);
            return;
        }
    });
});
// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            desciption: "An error has occurred",
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        desciption: "An error has occurred",
        error: {}
    });
});
module.exports = app;