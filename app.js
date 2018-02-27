const app = angular.module('OfficeTrivia', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:12345/questions/';
  this.currentQuestion = {};
  this.getQuestionIds = function(){
    $http({
      method: 'GET',
      url: this.url
    }).then(function(response){
      console.log(response, 'resposne');
    }, function(error){
      console.log(error, 'error')
    })
  };
  this.getRandomQuestion = function(){
    $http({
      method: 'GET',
      url: this.url + 'random'
    }).then(function(response){
      controller.currentQuestion = response.data;
      console.log(controller.currentQuestion, 'current question');
    }, function(error){
      console.log(error, 'random question error');
    })
  };
  this.deleteQuestion = function(id){
    $http({
      method: 'DELETE',
      url: this.url + id
    }).then(function(response){
      console.log(response, 'response from delete method');
    }, function(error){
      console.log(error);
    })
  }
  this.getRandomQuestion();
}])
