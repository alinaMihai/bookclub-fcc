(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('MyBooks', myBooksController);

    myBooksController.$inject = ['myBooksService', '$modal', 'usSpinnerService'];

    /* @ngInject */
    function myBooksController(myBooksService, $modal, usSpinnerService) {
        var vm = this;
        vm.myBooks = [];
        vm.deleteBook = deleteBook;
        vm.openAddBookModal = openAddBookModal;
        activate();

        ////////////////

        function activate() {
            myBooksService.getMyBooks().then(function(books) {
                vm.myBooks = books;
                usSpinnerService.stop('spinner-1');
            });
        }

        function addBooks(books) {
            myBooksService.addBooks(books).then(function(books) {
                vm.myBooks = vm.myBooks.concat(books);
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

        function openAddBookModal(size) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/mybooks/addBook.html',
                size: size,
                controller: 'AddBookCtrl as vm'
            });

            modalInstance.result.then(function(data) {
                addBooks(data);
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }



    AddBookController.$inject = ['$modalInstance', 'myBooksService'];

    /* @ngInject */
    function AddBookController($modalInstance, myBooksService) {
        var vm = this;
        vm.queryBook = '';
        vm.searchBook = searchBook;
        vm.results = [];
        vm.myBooks = [];
        vm.addBook = addBook;
        vm.ok = okHandler;
        vm.cancel = cancelHandler;

        function searchBook() {
            myBooksService.searchBook(vm.queryBook).then(function(books) {
                vm.results = books;
            });
        }

        function addBook(book) {
            vm.myBooks.push(book);
        }

        function okHandler() {
            $modalInstance.close(vm.myBooks);
        }

        function cancelHandler() {
            vm.myBooks = [];
            $modalInstance.dismiss('cancel');
        }
    }
    angular.module('bookclubApp').controller('AddBookCtrl', AddBookController);
})();