angular.module('starter.controllers', [])

.service('addModal', function($ionicModal, $rootScope) {
  
  
  var init = function($scope) {

    var promise;
    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl('templates/addMed.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.meds = JSON.parse(window.localstorage['Meds']);
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Perform the add action when the user submits the add form
    $scope.doAdd = function() {
      console.log('Adding Med', $scope.addData);

      var meds = JSON.parse(window.localstorage['Meds'] || "{}");

      var size = 0, key;
      for (key in meds) {
          if (meds.hasOwnProperty(key)) size++;
      }

      meds[size] = $scope.addData;

      console.log(meds);

      window.localstorage['Meds'] =  JSON.stringify(meds);

      $scope.closeModal();

    };

    
    return promise;
  }
  
  return {
    init: init
  }
  
})

.controller('AppCtrl', function($scope, $ionicModal, addModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //})

  if(window.localstorage == null)
    window.localstorage = [];

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

  $scope.add = function() {
    addModal
      .init($scope)
      .then(function(modal) {
        modal.show();
      });
  };

})

.controller('MedsCtrl', function($scope, addModal, $ionicModal) {
  $scope.meds = JSON.parse(window.localstorage['Meds'] || "{}");

  // Triggered in the add modal to close it
  $scope.closeAdd = function() {

    $scope.addMedModal.hide();
    $scope.meds = JSON.parse(window.localstorage['Meds']);
    //$scope.$apply();

    console.log($scope.meds);
  };

  // Perform the add action when the user submits the add form
  $scope.doAdd = function() {
    console.log('Adding Med', $scope.addData);

    var meds = JSON.parse(window.localstorage['Meds'] || "{}");

    var size = 0, key;
    for (key in meds) {
        if (meds.hasOwnProperty(key)) size++;
    }

    meds[size] = $scope.addData;

    window.localstorage['Meds'] =  JSON.stringify(meds);

    ///*$scope.$apply(function () {
      $scope.meds = meds;
    //});*/

    console.log(window.localstorage['Meds']);
    console.log($scope.meds);

    $scope.closeAdd();

  };

})

.controller('MedCtrl', function($scope, $stateParams) {
  $scope = {};
  $scope.meds = JSON.parse(window.localstorage['Meds']);

  var banana = $scope.meds[parseInt(window.location.href.match(/^.*\/(.*)$/)[1])];

  console.log(banana['name']);

  $scope.medname = banana['name'];
  $scope.meddose = banana['dosage'];

});
