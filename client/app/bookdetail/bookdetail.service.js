(function() {
    'use strict';

    angular
        .module('bookclupApp')
        .service('BookDetailService', BookDetailService);

    BookDetailService.$inject = ['$http', '$q'];

    /* @ngInject */
    function BookDetailService($http, $q) {
        this.getBook = getBook;

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
    }
})();