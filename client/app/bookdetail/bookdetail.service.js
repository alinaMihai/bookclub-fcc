(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('BookDetailService', BookDetailService);

    BookDetailService.$inject = ['$http', '$q'];

    /* @ngInject */
    function BookDetailService($http, $q) {
        this.getBook = getBook;
        this.requestBook = requestBook;
        this.getExistingRequest = getExistingRequest;

        ////////////////

        function getBook(id) {
            var deferred = $q.defer();
            $http.get('/api/books/' + id)
                .success(function(book) {
                    deferred.resolve(book);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function requestBook(bookId) {
            var deferred = $q.defer();
            $http.post('/api/bookrequests', {
                'book': bookId
            })
                .success(function(request) {
                    deferred.resolve(request);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function getExistingRequest(bookId) {
            var deferred = $q.defer();
            $http.get('/api/bookrequests/' + bookId)
                .success(function(request) {
                    deferred.resolve(true);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }
})();