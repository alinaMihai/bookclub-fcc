(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('AllBooks', AllBooksController);

    AllBooksController.$inject = ['AllBooksService'];

    /* @ngInject */
    function AllBooksController(AllBooksService) {
        var vm = this;
        vm.allBooks = [];

        activate();

        ////////////////

        function activate() {
            AllBooksService.getAllBooks().then(function(books) {
                vm.allBooks = books;
            });
        }
    }
})();