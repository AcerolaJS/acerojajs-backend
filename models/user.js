var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

var Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    session_token: String,
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date
    }        
});
Schema.methods.show = function()
{
    this.password = undefined;
    this.updated_at = undefined;
    this.created_at = undefined;    
    this.__v = undefined;
    return this;
}  
module.exports = mongoose.model('users', Schema);