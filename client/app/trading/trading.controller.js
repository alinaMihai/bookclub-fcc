(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('Trading', TradingController);

    TradingController.$inject = ['TradingService'];

    /* @ngInject */
    function TradingController(TradingService) {
        var vm = this;
        vm.userBookRequests = {};

        activate();

        ////////////////

        function activate() {
            TradingService.getBookRequests().then(function(userBookRequests) {
                vm.userBookRequests = userBookRequests;
                console.log(userBookRequests);
            });
        }
    }
})();