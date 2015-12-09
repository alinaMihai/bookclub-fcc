/**
 * Endpoints.
 * GET     /bookrequest/:id              ->  getExistingRequest
 * GET     /bookrequest                  ->  getBookRequests
 * POST    /bookrequest              	 ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Promise = require('promise');
var BookRequest = require('./bookrequest.model');

// Get my requests
exports.getMyRequests = function(req, res) {

};

exports.create = function(req, res) {
    var user = req.user.email;
    req.body.user = user;
    req.body.date = new Date().getTime();
    BookRequest.create(req.body, function(error, bookRequest) {
        if (error) {
            return handleError(res, error);
        }
        return res.status(200).send(bookRequest);
    });
}
exports.getExistingRequest = function(req, res) {
    var query = BookRequest.findOne({});
    query.where('user', req.user.email);
    query.where('book', req.params.bookId);
    query.exec(function(err, bookRequest) {
        if (err) {
            return handleError(res, err);
        }
        if (!bookRequest) {
            return res.status(404).send('Not found');
        }
        return res.status(200).send(bookRequest);
    });
}
exports.getBookRequests = function(req, res) {
    var user = req.user.email;
    var userRequests = {};
    var incomingPromise = getIncomingRequests(user);
    var outgoingPromise = getOutgoingRequests(user);

    Promise.all(incomingPromise, outgoingPromise).then(function(res) {
        userRequests.incomingRequests = res[0];
        userRequests.outgoingRequests = res[1];

        return res.status(200).send(userRequests);
    });
}


function getIncomingRequests(user) {
    var promise = new Promise(function(resolve, reject) {
        var query = BookRequest.find({});
        query.populate('book');
        query.exec(function(err, bookRequests) {
            if (err) {
                reject(0);
            }
            var incoming = bookRequests.filter(function(bookRequest) {
                return bookRequest.book.user === user;
            });
            resolve(incoming);
        });
    });
    return promise;
}

function getOutgoingRequests(user) {
    var promise = new Promise(function(resolve, reject) {
        var query = BookRequest.find({});
        query.where('user', user);
        query.exec(function(err, bookRequests) {
            if (err) {
                reject(0);
            }
            resolve(bookRequests);
        });
    });
    return promise;
}

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}