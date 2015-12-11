(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('UserProfile', userProfileController);

    userProfileController.$inject = ['User', '$stateParams', 'UserProfileService', 'usSpinnerService', 'toastr'];

    /* @ngInject */
    function userProfileController(User, $stateParams, UserProfileService, usSpinnerService, toastr) {
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
            }, function(err) {
                toastr.warning('This user account is no longer active', 'Warning');
            });

            UserProfileService.getUserBooks($stateParams.email).then(function(books) {
                vm.userBooks = books;
                usSpinnerService.stop('spinner-1');
            },function(err){
                usSpinnerService.stop('spinner-1');
            });

        }
    }
})();