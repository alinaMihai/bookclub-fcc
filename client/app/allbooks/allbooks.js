'use strict';

angular.module('bookclubApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('AllBooks', {
                url: '/allbooks',
                templateUrl: 'app/allbooks/allbooks.html',
                controller: 'AllBooks as vm'
            });
    });