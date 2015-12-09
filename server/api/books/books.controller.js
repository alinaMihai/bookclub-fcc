/**
 * Endpoints.
 * GET     /books/search/:query              ->  searchBook
 * GET     /books/:id                        ->  show
 * GET     /books/all                        ->  index
 * POST    /books              				 ->  addBook
 * DELETE  /books/:id                        ->  destroy
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
// Get a single book
exports.show = function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        if (!book) {
            return res.status(404).send('Not Found');
        }
        return res.json(book);
    });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        if (!book) {
            return res.status(404).send('Not Found');
        }
        book.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

// Get list of all books
exports.index = function(req, res) {
    Book.find({}).exec(function(err, books) {
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