'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var BookRequestSchema = new Schema({
    user: {
        type: ObjectIdSchema,
        ref: 'User'
    },
    owner: {
        type: ObjectIdSchema,
        ref: 'User'
    },
    book: {
        type: ObjectIdSchema,
        ref: 'Book'
    },
    date: Date
});

module.exports = mongoose.model('BookRequest', BookRequestSchema);