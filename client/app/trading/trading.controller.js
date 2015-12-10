(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('Trading', TradingController);

    TradingController.$inject = ['TradingService'];

    /* @ngInject */
    function TradingController(TradingService) {
        var vm = this;
        vm.userBookRequests;
        vm.handleRequest = handleRequest;

        activate();

        ////////////////

        function activate() {
            TradingService.getBookRequests().then(function(userBookRequests) {
                vm.userBookRequests = userBookRequests;
            });
        }

        function handleRequest(requestBookId, action) {
            TradingService.handleRequest(requestBookId, action).then(function(bookRequest) {
                //move to requests from others tab
                vm.userBookRequests.othersRequests.push(bookRequest);

                //remove the request from the incoming tab
                var requestIndex = _.findIndex(vm.userBookRequests.incomingRequests, {
                    '_id': bookRequest._id
                });
                vm.userBookRequests.incomingRequests.splice(requestIndex, 1);

            });
        }


    }
})();