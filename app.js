const app = angular.module('OfficeTrivia', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/questions/';
  this.currentQuestion = {};
  this.newQuestion = {
    answers: []
  };
  this.showEdit = false;
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
      controller.currentQuestion = {};
      controller.showEdit = false;
    }, function(error){
      console.log(error);
    })
  };
  this.createQuestion = function(){
    this.fillAnswerArray();
    $http({
      method: 'POST',
      url: this.url,
      data: this.newQuestion
    }).then(function(response){
      controller.newQuestion = {};
      console.log(response,' response from created question');
    }, function(error){
      console.log(error, 'error from created question');
    })
  };
  this.fillAnswerArray = function(){
    let num = Math.floor(Math.random()*4);
    this.newQuestion.correct = num
    if (num === 0) {
      this.newQuestion.answers[0] = this.newQuestion.answer;
      this.newQuestion.answers[1] = this.newQuestion.distractors[0];
      this.newQuestion.answers[2] = this.newQuestion.distractors[1];
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else if (num === 1) {
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.answer;
      this.newQuestion.answers[2] = this.newQuestion.distractors[1];
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else if (num === 2) {
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.distractors[1];
      this.newQuestion.answers[2] = this.newQuestion.answer;
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else {
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.distractors[1];
      this.newQuestion.answers[2] = this.newQuestion.distractors[2];
      this.newQuestion.answers[3] = this.newQuestion.answer;
    }
    console.log(this.newQuestion, 'new question');
  };
  this.editQuestion = function(id){
    console.log(this.currentQuestion);
    $http({
      url: this.url + 'edit/' + this.currentQuestion.id,
      method: 'PUT',
      data: this.currentQuestion
    }).then(function(response){
      console.log(response, 'edited question');
    },function(error){
      console.log(error, 'edit error')
    })
  };
}])
