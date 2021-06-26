const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.rf = require("./rf.model.js")(mongoose, mongoosePaginate);
db.user = require("./user.model.js")(mongoose, uniqueValidator);

module.exports = db;