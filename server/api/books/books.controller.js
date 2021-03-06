/**
 * Endpoints.
 * GET     /books/search/:query              ->  searchBook
 * GET     /books/:id                        ->  show
 * GET     /books/all                        ->  index
 * GET     /books/:userEmail                 ->  getUserBooks
 * POST    /books              				 ->  addBooks
 * DELETE  /books/:id                        ->  destroy
 */

'use strict';

var _ = require('lodash');
var Book = require('./books.model');
var BookRequest = require('../bookrequest/bookrequest.model');

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
        var books=changeThumbnailToSecure(results);
        return res.status(200).send(books);
    });
}

exports.addBooks = function(req, res) {
    var user = req.user.email;
    req.body.books.forEach(function(book) {
        book.user = user;
    });
    Book.collection.insert(req.body.books, function(err, books) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(books.ops);
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

exports.getUserBooks = function(req, res) {
    var query = Book.find({});
    query.where('user', req.params.userEmail);
    query.exec(function(err, books) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(books);
    })
}

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
        BookRequest.find({'book':book._id}).remove(function(err){
            if(err){
                handleError(res,err);
            }
        });
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

function changeThumbnailToSecure(books){
    return books.map(function(book){
        if(book.thumbnail){
               var thumbnail=book.thumbnail.replace('http','https');
               book.thumbnail=thumbnail;
        }
        return book;
    });
}