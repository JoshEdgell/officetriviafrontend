const app = angular.module('OfficeTrivia', []);

app.controller('MainController', ['$http', function($http){
  this.url = 'http://localhost:12345';
  this.getQuestionIds = function(){
    $http({
      method: 'GET',
      url: this.url + '/questions/'
    }).then(function(response){
      console.log(response, 'error');
    }, function(error){
      console.log(error, 'response')
    })
  };
  this.getQuestionIds();
}])
