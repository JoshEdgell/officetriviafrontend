const app = angular.module('OfficeTrivia', []);

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/questions/';
  this.currentQuestion = {};
  this.newQuestion = {
    answers: []
  };
  this.showEdit = false;
  this.showQuestion = false;
  this.showQuestionDiv = false;
  this.writeQuestionsDiv = false;
  this.showCorrectDiv = false;
  this.showIncorrectDiv = false;
  this.showReviewQuestion = false;
  this.hideAll = function(){
    this.showEdit = false;
    this.showQuestion = false;
    this.showQuestionDiv = false;
    this.writeQuestionsDiv = false;
    this.showCorrectDiv = false;
    this.showIncorrectDiv = false;
    this.showReviewQuestion = false;
  };
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
  this.getFirstQuestion = function(){
    this.hideAll();
    this.getRandomQuestion();
    this.showQuestionDiv = true;
  };
  this.getAnotherQuestion = function(){
    this.currentQuestion = {};
    this.hideAll();
    this.getRandomQuestion();
    this.showQuestionDiv = true;
  };
  this.writeQuestions = function(){
    this.hideAll();
    this.writeQuestionsDiv = true;
  }
  this.getRandomQuestion = function(){
    $http({
      method: 'GET',
      url: this.url + 'random'
    }).then(function(response){
      controller.currentQuestion = response.data;
      controller.showQuestion = true;
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
      controller.hideAll();
      controller.showReviewQuestion = true;
    }, function(error){
      console.log(error, 'error from created question');
    })
  };
  this.fillAnswerArray = function(){
    let num = Math.floor(Math.random()*4);
    this.newQuestion.correct = num
    this.newQuestion.answers = [];
    if (num === 0) {
      console.log('answer 0')
      this.newQuestion.answers[0] = this.newQuestion.answer;
      this.newQuestion.answers[1] = this.newQuestion.distractors[0];
      this.newQuestion.answers[2] = this.newQuestion.distractors[1];
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else if (num === 1) {
      console.log('answer 1')
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.answer;
      this.newQuestion.answers[2] = this.newQuestion.distractors[1];
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else if (num === 2) {
      console.log('answer 2')
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.distractors[1];
      this.newQuestion.answers[2] = this.newQuestion.answer;
      this.newQuestion.answers[3] = this.newQuestion.distractors[2];
    } else {
      console.log('answer 3')
      this.newQuestion.answers[0] = this.newQuestion.distractors[0];
      this.newQuestion.answers[1] = this.newQuestion.distractors[1];
      this.newQuestion.answers[2] = this.newQuestion.distractors[2];
      this.newQuestion.answers[3] = this.newQuestion.answer;
    };
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
  this.checkAnswer = function(num){
    this.showQuestion = false;
    $http({
      url: this.url + 'check/' + this.currentQuestion.id,
      method: 'PUT',
      data: { guess: num}
    }).then(function(response){
      controller.showQuestionDiv = false;
      if (response.data == 'correct') {
        controller.showCorrectDiv = true;
      } else {
        controller.showIncorrectDiv = true;
      }
    }, function(error){
      console.log(error);
    })
  }
}])
