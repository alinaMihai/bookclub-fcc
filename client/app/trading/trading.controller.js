(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('Trading', TradingController);

    TradingController.$inject = ['TradingService', 'usSpinnerService'];

    /* @ngInject */
    function TradingController(TradingService, usSpinnerService) {
        var vm = this;
        vm.userBookRequests;
        vm.handleRequest = handleRequest;

        activate();

        ////////////////

        function activate() {
            TradingService.getBookRequests().then(function(userBookRequests) {
                vm.userBookRequests = userBookRequests;
                usSpinnerService.stop('spinner-1');
            },function(err){
                usSpinnerService.stop('spinner-1');
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