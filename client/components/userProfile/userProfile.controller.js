(function() {
    'use strict';

    angular
        .module('bookclubApp')
        .controller('UserProfile', userProfileController);

    userProfileController.$inject = ['User', '$stateParams', 'UserProfileService'];

    /* @ngInject */
    function userProfileController(User, $stateParams, UserProfileService) {
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
            });

            UserProfileService.getUserBooks($stateParams.email).then(function(books) {
                vm.userBooks = books;
            });

        }
    }
})();