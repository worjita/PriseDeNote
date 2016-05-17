angular.module('starter', ['ionic','starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault()
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      })

      .state('form', {
        url: '/form/{id}',
        templateUrl: 'templates/form.html',
        controller: 'FormCtrl',
        params: {
          id: {value: null}
        }
      });

    $urlRouterProvider.otherwise('/list')
  });
