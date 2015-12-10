(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .directive('showBook', showBookDirective);

    /*showBookDirective.$inject = ['dependencies'];*/

    /* @ngInject */
    function showBookDirective() {
        var directive = {
            templateUrl: 'components/showBooks/showBooks.html',
            bindToController: true,
            controller: Controller,
            controllerAs: 'dirVm',
            link: link,
            restrict: 'E',
            scope: {
                books: '=',
                bookDelete: '&'
            },
            transclude: true
        };
        return directive;

        function link(scope, element, attrs) {
            var callback = scope.dirVm.bookDelete();
            scope.dirVm.deleteBook = function(book) {
                callback(book);
            }
            scope.dirVm.showDeleteButton = typeof callback === 'function';
        }
    }

    /* @ngInject */
    function Controller($scope) {

    }
})();