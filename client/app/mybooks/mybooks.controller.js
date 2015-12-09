(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('MyBooks', myBooksController);

    myBooksController.$inject = ['myBooksService'];

    /* @ngInject */
    function myBooksController(myBooksService) {
        var vm = this;
        vm.queryBook = '';
        vm.searchBook = searchBook;
        vm.results = [];
        vm.myBooks = [];
        vm.addBook = addBook;
        vm.deleteBook = deleteBook;
        activate();

        ////////////////

        function activate() {
            myBooksService.getMyBooks().then(function(books) {
                vm.myBooks = books;
            });
        }

        function searchBook() {
            myBooksService.searchBook(vm.queryBook).then(function(books) {
                vm.results = books;
            });
        }

        function addBook(book) {
            myBooksService.addBook(book).then(function(book) {
                vm.myBooks.push(book);
                vm.results = [];
            });
        }

        function deleteBook(book) {
            myBooksService.deleteBook(book._id).then(function() {
                var index = _.findIndex(vm.myBooks, {
                    _id: book._id
                });
                vm.myBooks.splice(index, 1);
            });
        }
    }
})();