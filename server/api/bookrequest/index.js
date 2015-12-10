'use strict';

var express = require('express');
var controller = require('./bookrequest.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/incoming', auth.isAuthenticated(), controller.getIncomingRequests);
router.get('/outgoing', auth.isAuthenticated(), controller.getOutgoingRequests);
router.get('/:bookId', auth.isAuthenticated(), controller.getExistingRequest);
router.put('/:id', auth.isAuthenticated(), controller.handleRequest);
/*router.get('/search/:query', controller.searchBook);
router.get('/', auth.isAuthenticated(), controller.getMyBooks);
router.get('/all', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.addBook);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);*/

module.exports = router;