var express = require('express'),
    passwordHash = require('password-hash'),
    util = require('util'),
    Helpers = require('../extras/controllershelpers'),
    Config = require('config'),
    UserModel = require('../models/user');
module.exports.controller = function(app) {
    var SessionController = {};
    SessionController.login = function(req, res, next) {
        req.checkBody('password', 'Is required').notEmpty();
        req.checkBody('email', 'Is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            res.send({
                "errors": errors
            }, 400);
            return;
        }
        UserModel.findOne({
            "email": req.body.email
        }, function(err, user) {
            user.session_token = passwordHash.generate(Config.get('secretword') + Date.now());
            user.save(function(err) {
                if (err) {
                    console.error('ERROR!');
                }
            });
            Helpers.response(req, res, user);
            return;
        });
    };
    SessionController.check = function(req, res, next) {
        var token = req.get('X-Auth-Token')
        var errors = req.validationErrors();
        if (errors) {
            res.send({
                "errors": errors
            }, 400);
            return;
        }
        UserModel.findOne({
            "session_token": token
        }, function(err, user) {
            if (err) return handleError(err);
            Helpers.response(req, res, user);
            return;
        });
    };
    app.post('/login:ext?/', SessionController.login);
    app.get('/app/v1/check:ext?/', SessionController.check);
}