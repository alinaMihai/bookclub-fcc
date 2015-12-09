'use strict';

angular.module('bookclubApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('Trading', {
                url: '/books/trading',
                templateUrl: 'app/trading/trading.html',
                controller: 'Trading as vm'
            });
    });