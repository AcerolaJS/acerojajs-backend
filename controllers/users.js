var express = require('express'),
    passwordHash = require('password-hash'),
    util = require('util'),
    Helpers = require('../extras/controllershelpers'),
    UserModel = require("../models/user");
module.exports.controller = function(app) {
    var UserController = {};
    UserController.findOne = function(req, res, next) {
        UserModel.findOne({
            "_id": req.params.id
        }).exec(function(err, user) {
            if (err) return handleError(err);
            Helpers.response(req, res, user);
        })
    };
    UserController.findAll = function(req, res, next) {
        UserModel.find().exec(function(err, users) {
            if (err) return handleError(err);
            Helpers.response(req, res, users);
        })
    };
    UserController.create = function(req, res, next) {
        req.checkBody('name', 'Is required').notEmpty();
        req.checkBody('surname', 'Is required').notEmpty();
        req.checkBody('password', 'Is required').notEmpty();
        req.checkBody('email', 'Is required').notEmpty();
        req.checkBody('password', 'Is required').notEmpty();
        req.checkBody('email', 'Is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            res.send({
                "errors": errors
            }, 400);
            console.log(errors);
            return;
        }        
        var passwordEncrypted = passwordHash.generate(req.body.password);
        var user = new UserModel({
            nickname: req.body.nickname,
            name: req.body.name,
            surname: req.body.surname,
            password: passwordEncrypted,
            email: req.body.email,
            roles: ["user"],
            session_token: "",
            updated_at: Date.now(),
            created_at: Date.now()
        });
        user.save(function(err) {
            if (err) {
                res.send({
                    "errors": ["User are not created"]
                }, 400);
                console.log(err);
                return;
            } else {
                Helpers.response(req, res, user);
                return;
            }
        });
    };
    UserController.update = function(req, res, next) {
        req.body.updated_at = Date.now();
        UserModel.findOneAndUpdate({
            "_id": req.params.id
        }, req.body).exec(function(err, user) {
            if (err) res.send({
                "errors": ["User are not created" + err]
            }, 400);
        });
        UserModel.find({
            "_id": req.params.id
        }).exec(function(err, user) {
            if (err) return handleError(err);            
            Helpers.response(req, res, user);
        })
    };
    app.post('/app/user:ext?/', UserController.create);
    app.get('/app/v1/users:ext?/', UserController.findAll);
    app.get('/app/v1/user:ext?/:id', UserController.findOne);
    app.put('/app/v1/user:ext?/:id', UserController.update);
}