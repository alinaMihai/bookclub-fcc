(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('UserProfileService', UserProfileService);

    UserProfileService.$inject = ['$http', '$q'];

    /* @ngInject */
    function UserProfileService($http, $q) {
        this.getUserBooks = getUserBooks;

        ////////////////

        function getUserBooks(userEmail) {
            var deferred = $q.defer();
            $http.get('/api/books/user/' + userEmail)
                .success(function(books) {
                    deferred.resolve(books);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }
})();