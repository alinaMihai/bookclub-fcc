'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    user: String,
    thumbnail: String,
    authors: [{
        type: String
    }],
    link: String,
    publishedDate: String,
    publisher: String,
    pageCount: Number,
    language: String
});

module.exports = mongoose.model('Book', BookSchema);