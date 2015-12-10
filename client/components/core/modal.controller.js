(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('ModalInstanceCtrl', Controller);

    Controller.$inject = ['$modalInstance', 'data'];

    /* @ngInject */
    function Controller($modalInstance, data) {
        var vm = this;
        vm.data = data;
        vm.ok = okHandler;
        vm.cancel = cancelHandler;

        function okHandler() {
            $modalInstance.close(data);
        }

        function cancelHandler() {
            $modalInstance.dismiss('cancel');
        }
    }

})();