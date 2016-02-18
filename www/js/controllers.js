angular.module('starter.controllers', [])

.factory('addModal', function($ionicModal, $rootScope) {
  
  if(window.localstorage == null)
    window.localstorage = [];

  var meds = JSON.parse(window.localstorage['Meds'] || "{}");

  function init($scope) {

    var promise;

    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl('templates/addMed.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });
    
    // Form data for the add modal
    $scope.addData = {};

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.addData = {};
      meds = JSON.parse(window.localstorage['Meds']);
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Perform the add action when the user submits the add form
    $scope.doAdd = function() {
      
      var size = 0, key;
      for (key in meds) {
          if (meds.hasOwnProperty(key)) 
            size++;
      }

      meds[size] = $scope.addData;

      window.localstorage['Meds'] =  JSON.stringify(meds);
      //meds = JSON.parse(window.localstorage['Meds']);

      $scope.closeModal();

    };
    
    return promise;
  }
  function getMeds(){
    return meds;
  }
  return {
    init: init,
    getMeds: getMeds,
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

  $scope.add = function() {
    addModal
      .init($scope)
      .then(function(modal) {
        modal.show();
      });
  };

})

.controller('MedsCtrl', function($scope, addModal, $ionicModal) {

  $scope.$watch(function() {return addModal.getMeds();},
    function(value){
      $scope.meds = value;
    }

  );

})

.controller('MedCtrl', function($scope, $stateParams) {

  $scope.meds = JSON.parse(window.localstorage['Meds'] || "{}");

  var banana = $scope.meds[parseInt(window.location.href.match(/^.*\/(.*)$/)[1])];

  $scope.o = {};

  $scope.o.medname = banana['name'];
  $scope.o.meddose = banana['dosage'];

});
