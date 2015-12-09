(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('TradingService', TradingService);

    TradingService.$inject = ['$http', '$q'];

    /* @ngInject */
    function TradingService($http, $q) {
        this.getBookRequests = getBookRequests;

        ////////////////

        function getBookRequests() {
            var deferred = $q.defer();
            $http.get('/api/bookrequest')
                .success(function(userBookRequests) {
                    deferred.resolve(userBookRequests);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }
})();