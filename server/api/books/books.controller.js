/**
 * Endpoints.
 * GET     /books/search/:query              ->  searchBook
 * POST    /books              				 ->  addBook
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Book = require('./books.model');

var books = require('google-books-search');


exports.searchBook = function(req, res) {
    var options = {

        type: 'books',
        order: 'relevance',
        limit: 12,
        offset: 0
    };
    var query = decodeURIComponent(req.params.query);
    books.search(query, options, function(error, results) {
        if (error) {
            return handleError(res, error);
        }
        return res.status(200).send(results);
    });
}

exports.addBook = function(req, res) {
    var user = req.user.email;
    req.body.user = user;
    Book.create(req.body, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(book);
    });
}
// Get list of books
exports.getMyBooks = function(req, res) {
    var query = Book.find({});
    query.where('user', req.user.email);
    query.exec(function(err, books) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(books);
    });
};


function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}