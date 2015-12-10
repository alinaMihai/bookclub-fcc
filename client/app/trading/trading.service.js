(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('TradingService', TradingService);

    TradingService.$inject = ['$http', '$q'];

    /* @ngInject */
    function TradingService($http, $q) {
        this.getBookRequests = getBookRequests;
        this.handleRequest = handleRequest;

        ////////////////

        function getBookRequests() {
            var deferred = $q.defer();
            var incomingPromise = getIncomingRequests();
            var outgoingPromise = getOutgoingRequests();

            $q.all([incomingPromise, outgoingPromise]).then(function(response) {
                var userBookRequests = {};

                var incomingRequests = filterRequests(response[0].data);
                var outgoingRequests = filterRequests(response[1].data);

                userBookRequests.incomingRequests = incomingRequests.pending;
                userBookRequests.othersRequests = incomingRequests.processed;

                userBookRequests.outgoingRequests = outgoingRequests.pending;
                userBookRequests.myRequests = outgoingRequests.processed;

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

        function handleRequest(bookRequestId, action) {
            var deferred = $q.defer();
            $http.put('/api/bookrequests/' + bookRequestId, {
                'status': action
            })
                .success(function(bookRequest) {
                    deferred.resolve(bookRequest);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function filterRequests(requests) {
            var processed = [],
                pending = [];
            requests.forEach(function(request) {
                if (request.status === undefined) {
                    pending.push(request);
                } else {
                    processed.push(request);
                }
            });
            return {
                'processed': processed,
                'pending': pending
            };
        }
    }
})();