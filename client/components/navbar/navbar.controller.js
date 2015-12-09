'use strict';

angular.module('bookclubApp')
    .controller('NavbarCtrl', function($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/',
            'state': 'main'
        }, {
            'title': 'My Books',
            'link': '/myBooks',
            'state': 'myBooks'
        }, {
            'title': 'All Books',
            'link': '/allbooks',
            'state': 'AllBooks'
        }, {
            'title': 'Trading',
            'link': '/books/trading',
            'state': 'Trading'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });