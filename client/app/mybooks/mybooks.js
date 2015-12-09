'use strict';

angular.module('bookclubApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('myBooks', {
                url: '/myBooks',
                templateUrl: 'app/mybooks/mybooks.html',
                controller: 'MyBooks as vm'
            });
    });