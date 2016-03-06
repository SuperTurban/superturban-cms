var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./../config.js');

mongoose.connect(config.db);