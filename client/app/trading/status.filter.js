(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .filter('statusFilter', filter);

    function filter() {
        return filterFilter;

        ////////////////

        function filterFilter(status) {
            if (status === undefined) {
                return "Pending"
            }
            return status ? 'Accepted' : 'Rejected';
        }
    }

})();