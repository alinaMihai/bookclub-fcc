(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('myBooksService', myBooksService);

    myBooksService.$inject = ['$http', '$q'];

    /* @ngInject */
    function myBooksService($http, $q, apiKey) {
        this.searchBook = searchBook;
        this.addBooks = addBooks;
        this.getMyBooks = getMyBooks;
        this.deleteBook = deleteBook;

        function searchBook(query) {
            var deferred = $q.defer();
            $http.get('/api/books/search/' + encodeURIComponent(query))
                .success(function(results) {
                    deferred.resolve(results);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function addBooks(books) {
            var deferred = $q.defer();
            $http.post('/api/books', {
                'books': books
            })
                .success(function(books) {
                    deferred.resolve(books);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function getMyBooks() {
            var deferred = $q.defer();
            $http.get('/api/books')
                .success(function(books) {
                    deferred.resolve(books);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function deleteBook(id) {
            var deferred = $q.defer();
            $http.delete('/api/books/' + id)
                .success(function(response) {
                    deferred.resolve();
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }
})();