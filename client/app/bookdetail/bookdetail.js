'use strict';

angular.module('bookclubApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('BookDetail', {
                url: '/bookDetail/:id',
                templateUrl: 'app/bookdetail/bookdetail.html',
                controller: 'BookDetail as vm'
            });
    });