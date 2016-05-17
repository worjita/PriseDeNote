/**
 * Created by Khadija on 17/05/2016.
 */
angular.module('starter.controllers', [])

  .controller('ListCtrl', function ($scope,$ionicPlatform, $state, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
      NotesDataService.getAll(function(data){
        $scope.itemsList = data;
      })
    });

    $scope.gotoEdit = function(idNote){
      $state.go('form', {id: idNote});
    }
  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
      initForm();
    });

    function initForm(){
      if($stateParams.id){
        NotesDataService.getById($stateParams.id, function(item){
          $scope.noteForm = item;
        })
      } else {
        $scope.noteForm = {};
      }
    }
    function onSaveSuccess(){
      $state.go('list');
    }
    $scope.saveNote = function(){

      if(!$scope.noteForm.id){
        NotesDataService.createNote($scope.noteForm).then(onSaveSuccess);
      } else {
        NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess);
      }
    };

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Supprimer une note',
        template: 'êtes vous sûr de vouloir supprimer ?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote(idNote).then(onSaveSuccess);
        }
      })
    }


  });
