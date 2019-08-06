var questionsdata = null;
var wrongcount = 0;
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

function getQuestions() {
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

function writeQuestionOne() {
    var firstQuestion = questionsdata[0].question;
    var firstIncorrect = questionsdata[0].incorrect_answers;
    var firstCorrect = questionsdata[0].correct_answer;
    answers = [{"answer" : firstCorrect, "correct" : true}, 
               {"answer" : firstIncorrect[0], "correct" : false}, 
               {"answer" : firstIncorrect[1], "correct" : false}, 
               {"answer" : firstIncorrect[2], "correct" : false}];
    shuffle(answers);
    createQuestion(firstQuestion, answers);
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

function createQuestion(question, answers){
  var container = document.getElementById("testcontainer");
    container.innerHTML = "";
  var addId = document.createAttribute("id");
    addId.value = "questiontitle";
  var question_title = document.createElement("h2");
    question_title.setAttributeNode(addId);
    container.appendChild(question_title);
    question_title.innerText = question;
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
  getQuestion();
  createQuestion();
}

function getQuestion () {
    var correct = []
    var incorrect = [[]]
    var quests = []
    for(var i = 0; i < questionsdata.length; i++){
        quests[i] = questionsdata[i].question;
        incorrect[i] = questionsdata[i].incorrect_answers;
        correct[i] = questionsdata[i].correct_answer;
        answers[i] = [{"answer" : correct, "correct" : true}, 
                   {"answer" : incorrect[i][0], "correct" : false}, 
                   {"answer" : incorrect[i][1], "correct" : false}, 
                   {"answer" : incorrect[i][2], "correct" : false}];
    }
    console.log(quests)
    console.log(answers[1])
}

function start() {
    writeQuestionOne();
}