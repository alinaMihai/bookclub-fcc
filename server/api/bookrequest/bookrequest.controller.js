/**
 * Endpoints.
 * GET      /bookrequests/:id                        ->  getExistingRequest
 * GET      /bookrequests/incoming                   ->  getIncomingRequests
 * GET      /bookrequests/outgoing                   ->  getOutgoingRequests
 * POST     /bookrequests              	             ->  create
 * PUT      /bookrequests/:id                        ->  handleRequest
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
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

exports.getIncomingRequests = function(req, res) {
    var user = req.user.email;
    var query = BookRequest.find({});
    query.populate('book');
    query.exec(function(err, bookRequests) {
        if (err) {
            console.log(err);
            return handleError(res, err);
        }
        var incoming = bookRequests.filter(function(bookRequest) {
            if(bookRequest.book){
                return bookRequest.book.user === user;    
            }else{
                return 0;
            }
            
        });
        return res.status(200).send(incoming);
    });
}

exports.getOutgoingRequests = function(req, res) {
    var user = req.user.email;
    var query = BookRequest.find({});
    query.where('user', user);
    query.populate('book');
    query.exec(function(err, bookRequests) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).send(bookRequests);

    });

}
//approve or reject request
exports.handleRequest = function(req, res) {
    var query = BookRequest.findOne({});
    query.where('_id', req.params.id);
    query.populate('book');
    query.exec(function(err, bookRequest) {
        if (err) {
            return handleError(res, err);
        }
        if (!bookRequest) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(bookRequest, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(bookRequest);
        });
    });

}

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}