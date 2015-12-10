(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('myBooksService', myBooksService);

    myBooksService.$inject = ['$http', '$q', 'toastr'];

    /* @ngInject */
    function myBooksService($http, $q, toastr) {
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
                    toastr.success('Books added to your shelf', 'Add Books Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                    toastr.error('Error: Could not add books successfully', err);
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
                    toastr.error('Error: Could not retrieve books successfully', err);
                });
            return deferred.promise;
        }

        function deleteBook(id) {
            var deferred = $q.defer();
            $http.delete('/api/books/' + id)
                .success(function(response) {
                    deferred.resolve();
                    toastr.success('Book deleted successfully', 'Delete Book Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                    toastr.error('Error: Could not delete book', err);
                });
            return deferred.promise;
        }
    }
})();