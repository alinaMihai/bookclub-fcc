(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('BookDetail', bookDetailController);

    bookDetailController.$inject = ['BookDetailService', '$stateParams', 'Auth', 'usSpinnerService'];

    /* @ngInject */
    function bookDetailController(BookDetailService, $stateParams, Auth, usSpinnerService) {
        var vm = this;
        var currentUser = Auth.getCurrentUser();
        vm.book = {};
        vm.requestBook = requestBook;
        vm.canMakeRequest = false;
        vm.requestActionText = "Request Book";
        activate();

        ////////////////

        function activate() {
            BookDetailService.getBook($stateParams.id).then(function(book) {
                vm.book = book;
                vm.canMakeRequest = currentUser.email !== vm.book.user;

                BookDetailService.getExistingRequest(vm.book._id).then(function(requestMade) {
                    vm.requestMade = requestMade;
                    if (requestMade) {
                        vm.requestActionText = "Request made";
                    }
                    usSpinnerService.stop('spinner-1');
                });
            });
        }

        function requestBook() {
            BookDetailService.requestBook(vm.book._id).then(function(request) {
                vm.requestActionText = "Request made";
                vm.requestMade = true;
            });
        }


    }
})();