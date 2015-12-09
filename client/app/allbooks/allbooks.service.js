(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('AllBooksService', AllBooksService);

    AllBooksService.$inject = ['$http', '$q'];

    /* @ngInject */
    function AllBooksService($http, $q) {
        this.getAllBooks = getAllBooks;

        ////////////////

        function getAllBooks() {
            var deferred = $q.defer();
            $http.get('/api/books/all')
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