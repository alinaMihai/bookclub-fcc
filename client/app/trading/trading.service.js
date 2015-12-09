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
            var incomingPromise = getIncomingRequests();
            var outgoingPromise = getOutgoingRequests();

            $q.all([incomingPromise, outgoingPromise]).then(function(response) {
                var userBookRequests = {};
                userBookRequests.incomingRequests = response[0].data;
                userBookRequests.outgoingRequests = response[1].data;
                deferred.resolve(userBookRequests);
            })
            return deferred.promise;
        }

        function getIncomingRequests() {
            return $http.get('/api/bookrequests/incoming');
        }

        function getOutgoingRequests() {
            return $http.get('/api/bookrequests/outgoing');
        }
    }
})();