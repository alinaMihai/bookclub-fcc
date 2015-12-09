/**
 * Endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var BookRequest = require('./bookrequest.model');

// Get my requests
exports.getMyRequests = function(req, res) {

};