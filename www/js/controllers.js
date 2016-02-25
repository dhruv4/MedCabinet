angular.module('starter.controllers', ['angularMoment',])

.factory('addModal', function($ionicModal, $rootScope) {
  
  if(window.localstorage == null)
    window.localstorage = [];

  var meds = JSON.parse(window.localstorage['Meds'] || "{}");
  var notes = JSON.parse(window.localstorage['Notes'] || "{}");

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

.factory('noteModal', function($ionicModal, $rootScope, moment) {
  
  if(window.localstorage == null)
    window.localstorage = [];

  var notes = JSON.parse(window.localstorage['Notes'] || "{}");

  function init($scope) {

    var promise;

    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl('templates/addNote.html', {
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
      notes = JSON.parse(window.localstorage['Notes']);
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Perform the add action when the user submits the add form
    $scope.doAdd = function() {
      
      var size = 0, key;
      for (key in notes) {
          if (notes.hasOwnProperty(key)) 
            size++;
      }

      $scope.addData.date = moment().format("MMMM Do YYYY, h:mm:ss a");

      notes[size] = $scope.addData;

      window.localstorage['Notes'] =  JSON.stringify(notes);

      $scope.closeModal();

    };
    
    return promise;
  }
  function getNotes(){
    return notes;
  }
  return {
    init: init,
    getNotes: getNotes,
  }
  
})

.controller('AppCtrl', function($scope, $ionicModal, addModal, noteModal) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //})

  if(window.localstorage == null)
    window.localstorage = [];

  $scope.add = function() {

    if(window.location.href.match(/^.*\/(.*)$/)[1] == "shelf")
      addModal
        .init($scope)
        .then(function(modal) {
          modal.show();
        });
    else if(window.location.href.match(/^.*\/(.*)$/)[1] == "notes")
      noteModal
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

  $scope.onMedDelete = function(i) {
    //$scope.meds.splice(i, 1);
    delete $scope.meds[i];
    window.localstorage['Meds'] =  JSON.stringify($scope.meds);
  };

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

})

.controller('MedCtrl', function($scope, $stateParams) {

  $scope.meds = JSON.parse(window.localstorage['Meds'] || "{}");

  var banana = $scope.meds[parseInt(window.location.href.match(/^.*\/(.*)$/)[1])];

  $scope.o = {};

  $scope.o.medname = banana['name'];
  $scope.o.meddose = banana['dosage'];
  $scope.o.meddoseText = banana['dosageText'];

})

.controller('NotesCtrl', function($scope, noteModal, $ionicModal) {

  $scope.$watch(function() {return noteModal.getNotes();},
    function(value){
      $scope.notes = value;
    }

  );

})

.controller('NoteCtrl', function($scope, $stateParams, moment) {

  $scope.notes = JSON.parse(window.localstorage['Notes'] || "{}");

  var banana = $scope.notes[parseInt(window.location.href.match(/^.*\/(.*)$/)[1])];

  $scope.o = {};

  $scope.o.notetitle = banana['title'];
  $scope.o.notetext = banana['text'];
  $scope.o.notedate = moment(banana['date'], "MMMM Do YYYY, h:mm:ss a").format("MMMM Do YYYY, h:mm:ss a");

});
