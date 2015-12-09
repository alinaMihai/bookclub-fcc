(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('BookDetail', bookDetailController);

    bookDetailController.$inject = ['BookDetailService', '$stateParams'];

    /* @ngInject */
    function bookDetailController(BookDetailService, $stateParams) {
        var vm = this;
        vm.book = {};
        activate();

        ////////////////

        function activate() {
            BookDetailService.getBook($stateParams.id).then(function(book) {
                vm.book = book;
            });
        }
    }
})();