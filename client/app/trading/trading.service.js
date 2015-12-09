(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .service('TradingService', TradingService);

    TradingService.$inject = ['$http', '$q'];

    /* @ngInject */
    function TradingService($http, $q) {
        this.func = func;

        ////////////////

        function func() {}
    }
})();