'use strict';

var express = require('express');
var controller = require('./books.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/search/:query', controller.searchBook);
router.get('/', auth.isAuthenticated(), controller.getMyBooks);
router.get('/all', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.addBooks);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;