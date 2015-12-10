'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var BookRequestSchema = new Schema({
    user: String,
    book: {
        type: ObjectIdSchema,
        ref: 'Book'
    },
    date: Date,
    status: Boolean
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);