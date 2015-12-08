angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the add modal
  $scope.addData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the addMed modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addMed.html', {
    scope: $scope
  }).then(function(addMedModal) {
    $scope.addMedModal = addMedModal;
  });

  // Triggered in the login modal to close it
  $scope.closeAdd = function() {
    $scope.addMedModal.hide();
  };

  // Open the login modal
  $scope.add = function() {
    $scope.addMedModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAdd = function() {
    console.log('Adding Med', $scope.addData);

    var meds = JSON.parse(window.localstorage['Meds'] || '{}');

    meds.push($scope.addData);

    window.localstorage['Meds'] = meds;

    $scope.closeAdd();

  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MedsCtrl', function($scope) {

  $scope.meds = window.localstorage['meds'];

  /*

   || [
    { title: 'Tylenol', id: 1 },
    { title: 'Claritin', id: 2 },
    { title: 'Benadryl', id: 3 },
    { title: 'Advil', id: 4 },
    { title: 'Morphine', id: 5 },
    { title: 'Marijuana', id: 6 }
  ];

  */
})

.controller('MedCtrl', function($scope, $stateParams) {

});
