'use strict';

var express = require('express');
var controller = require('./books.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/search/:query', controller.searchBook);
router.post('/', auth.isAuthenticated(), controller.addBook);
router.get('/', auth.isAuthenticated(), controller.getMyBooks);
/*router.get('/', controller.getMyBooks);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;