'use strict';

angular.module('bookclubApp')
    .controller('SettingsCtrl', function($scope, User, Auth, toastr) {
        var vm = this;
        vm.userProfile = {};
        vm.updateProfile = updateProfile;
        $scope.errors = {};

        var user = User.get();

        activate();

        function activate() {
            user.$promise.then(function() {
                vm.userProfile = {
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'city': user.city,
                    'state': user.state
                };
            });

        }

        function updateProfile() {
            var updatedUser = angular.extend(user, vm.userProfile);
            delete updatedUser.$promise;
            delete updatedUser.$resolved;
            delete updatedUser._v;
            user.$update(updatedUser).then(function(user) {
                toastr.success("Your profile was successfully updated", "Profile Updated");
            });
        }

        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });