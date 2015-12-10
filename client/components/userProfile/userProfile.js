'use strict';

angular.module('bookclubApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('UserProfile', {
                url: '/UserProfile/:email',
                templateUrl: 'components/userProfile/userProfile.html',
                controller: 'UserProfile as vm'
            });
    });