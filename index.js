var questionsdata = null;
var wrongcount = 0;
var questionCount = 0;
var answers = [];
var questions = [];
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

function getData() {
fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        questionsdata = data.results;
  })
    .catch(function(error){
        alert("Could not get any questions!");
  })
  // add start button creation to load
}

function getQuestion () {
    var correct = []
    var incorrect = []
    for(var i = 0; i < questionsdata.length; i++){
        questions[i] = questionsdata[i].question;
        incorrect[i] = questionsdata[i].incorrect_answers;
        correct[i] = questionsdata[i].correct_answer;
        answers[i] = [{"answer" : correct[i], "correct" : true}, 
                      {"answer" : incorrect[i][0], "correct" : false}, 
                      {"answer" : incorrect[i][1], "correct" : false}, 
                      {"answer" : incorrect[i][2], "correct" : false}];
    }
    shuffle(answers);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
  
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function createQuestionElements(question){
  var container = document.getElementById("testcontainer");
    container.innerHTML = "";
  var addId = document.createAttribute("id");
    addId.value = "questiontitle";
  var question_title = document.createElement("h2");
    question_title.setAttributeNode(addId);
    container.appendChild(question_title);
    question_title.innerText = question;

    createButtons(container);
}

function createButtons(container) {
    var questionId = document.createAttribute("id");
      questionId.value = "answers";
    var buttonee = document.createElement("div");
    var buttoncontainer = container.appendChild(buttonee);
      buttoncontainer.setAttributeNode(questionId);
  
    var count = 0
    for(var i = 0; i < answers.length; i++){
      var buttons = document.createElement("button");
      buttoncontainer.appendChild(buttons);
      buttons.innerText = answers[i].answer;
      buttons.id = "answerbutton" + count;
      buttons.classList.add(answers[i].correct);
      buttons.onclick = correctness;
      count++
    }
  }

function correctness() {
     if (this.className === "true"){
        alert("correct!");
    } else { wrongcount++;
  }
  questionCount++
  getQuestion();
  pickQuestion();
  question = questions[questionCount]
  createQuestionElements(question);
}



function start() {
    getQuestion();
    pickQuestion();
}

function pickQuestion() {
    question = questions[questionCount]
    answers = answers[questionCount]
    createQuestionElements(question, answers);
}