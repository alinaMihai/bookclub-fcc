(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('AllBooks', AllBooksController);

    AllBooksController.$inject = ['AllBooksService', 'usSpinnerService'];

    /* @ngInject */
    function AllBooksController(AllBooksService, usSpinnerService) {
        var vm = this;
        vm.allBooks = [];

        activate();

        ////////////////

        function activate() {
            AllBooksService.getAllBooks().then(function(books) {
                vm.allBooks = books;
                usSpinnerService.stop('spinner-1');
            });
        }
    }
})();