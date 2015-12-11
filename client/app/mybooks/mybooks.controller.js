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
            },function(err){
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



    AddBookController.$inject = ['$modalInstance', 'myBooksService', 'usSpinnerService'];

    /* @ngInject */
    function AddBookController($modalInstance, myBooksService, usSpinnerService) {
        var vm = this;
        vm.queryBook = '';
        vm.searchBook = searchBook;
        vm.results = [];
        vm.myBooks = [];
        vm.addBook = addBook;
        vm.resultsIndex=[];
        vm.ok = okHandler;
        vm.cancel = cancelHandler;

        function searchBook() {
            usSpinnerService.spin('spinner-search');
            myBooksService.searchBook(vm.queryBook).then(function(books) {
                vm.results = books;
                vm.resultsIndex=[];
                usSpinnerService.stop('spinner-search');
            },function(err){
                usSpinnerService.stop('spinner-search');
            });
        }

        function addBook(book,resultIndex) {
            var bookIndex=_.findIndex(vm.myBooks,{'id':book.id});
            if(bookIndex===-1){
                vm.myBooks.push(book);
                vm.resultsIndex[resultIndex]=1;    
            }else{
                vm.myBooks.splice(bookIndex,1);
                vm.resultsIndex[resultIndex]=0;
            }
            
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