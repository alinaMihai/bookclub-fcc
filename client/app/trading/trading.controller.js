(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('Trading', TradingController);

    TradingController.$inject = ['TradingService'];

    /* @ngInject */
    function TradingController(TradingService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {}
    }
})();