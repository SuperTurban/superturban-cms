var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./../config.js');

//load models
require('./../models/user.js');
require('./../models/field.js');
require('./../models/page.js');


mongoose.connect(config.db);