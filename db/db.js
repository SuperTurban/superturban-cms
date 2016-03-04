var mongo = require('mongodb');
var monk = require('monk');
var config = require('./../config.js');
var db = monk(config.db);

module.exports = db;