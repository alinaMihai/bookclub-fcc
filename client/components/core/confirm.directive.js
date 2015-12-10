(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .directive('confirmClick', confirmClick);

    confirmClick.$inject = ['$modal'];

    /* @ngInject */
    function confirmClick($modal) {
        var directive = {
            priority: -1,
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {


            element.bind('click', function(e) {
                var clickAction = attrs.ngClick;
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'components/core/confirmDelete.html',
                    size: 'lg',
                    controller: 'ModalInstanceCtrl as modalCtrl',
                    resolve: {
                        data: {}
                    }
                });

                modalInstance.result.then(function() {
                    scope.$eval(clickAction);
                });

                e.stopImmediatePropagation();
                e.preventDefault();
            });

        }
    }
})();