var app = angular.module('chatroom', ['ngMaterial']);

app.config(function($httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');
});


