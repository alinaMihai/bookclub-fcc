(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('UserProfile', userProfileController);

    userProfileController.$inject = ['User', '$stateParams', 'UserProfileService', 'usSpinnerService'];

    /* @ngInject */
    function userProfileController(User, $stateParams, UserProfileService, usSpinnerService) {
        var vm = this;
        vm.userBooks = [];
        var userResource = User.get();
        activate();

        ////////////////

        function activate() {
            userResource.$getUserProfile({
                'email': $stateParams.email
            }).then(function(user) {
                vm.user = user;
                usSpinnerService.stop('spinner-1');
            });

            UserProfileService.getUserBooks($stateParams.email).then(function(books) {
                vm.userBooks = books;
            });

        }
    }
})();