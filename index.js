var questionsdata = null;
var wrongCount = 0;
var questionCount = 0;
var answers = [];
var questions = [];
const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

function getData() {
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        questionsdata = data.results
    })
    .then(() => {
      loadButton();
      console.log(questionsdata)
  })
    .catch(function(error) {
        alert("Could not get any questions!");
  })
}

function getQuestion () {
    var correct = []
    var incorrect = []
    for (var i = 0; i < questionsdata.length; i++) {
        questions[i] = questionsdata[i].question;
        incorrect[i] = questionsdata[i].incorrect_answers;

        var characters = ['&amp;;', '&quot;', '&#039;', '&rsquo;', '&ldquo;', '&rdquo;', '&eacute;', '&shy;', "&Uuml;", "&Aacute;", '&aacute;', '&oacute', '&amp;', '&lt;'];
        var actual =  ['&', '"', "'", "'", '"', '"', 'é', '-', 'Ü', 'Á', 'á', 'ó', '&', '<'];

        for (var j = 0; j < incorrect[i].length; j++) {
            for (var h = 0; h < characters.length; h++) {
            incorrect[i][j] =  incorrect[i][j].replace(new RegExp(characters[h], 'g'), actual[h]);
            }
}

        correct[i] = questionsdata[i].correct_answer;

        for (var j = 0; j < characters.length; j++) {
            correct[i] =  correct[i].replace(new RegExp(characters[j], 'g'), actual[j]);
        }

        answers[i] = [{"answer" : correct[i], "correct" : "correct"}, 
                      {"answer" : incorrect[i][0], "correct" : "incorrect"}, 
                      {"answer" : incorrect[i][1], "correct" : "incorrect"}, 
                      {"answer" : incorrect[i][2], "correct" : "incorrect"}];
        shuffle(answers[i]);

        for (var j = 0; j < characters.length; j++) {
            questions[i] = questions[i].replace(new RegExp(characters[j], 'g'), actual[j]);
        }
    }
}

function loadButton() {
  const quizButton = document.querySelector('#startbutton');
  quizButton.classList.remove('loading')
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



function createQuestionElements(question) {

if (questionCount < 10) {
  var container = document.getElementById("testcontainer");
    container.innerHTML = "";
  var addId = document.createAttribute("id");
    addId.value = "questiontitle";
  var questionTitle = document.createElement("h2");
    questionTitle.setAttributeNode(addId);
    container.appendChild(questionTitle);
    questionTitle.innerText = question;

    createButtons(container);
} else {
    completionScreen();
    }
}

function createButtons(container) {
    var questionId = document.createAttribute("id");
      questionId.value = "answers";
    var buttonDiv = document.createElement("div");
    var buttonContainer = container.appendChild(buttonDiv);
      buttonContainer.setAttributeNode(questionId);

    var count = 0
    for (var i = 0; i < answers.length; i++) {
      var buttons = document.createElement("button");
        buttonContainer.appendChild(buttons);
        buttons.innerText = answers[i].answer;
        buttons.id = "answerbutton" + count;
        buttons.classList.add(answers[i].correct, "ui", "red", "button");
        buttons.onclick = correctness;
        count++
    }
}

function correctness() {
     if (this.className === "correct") {
        alert("Correct!");
    } else { 
        alert("Incorrect")
        wrongCount++;
  }
    questionCount++
    getQuestion();
    pickQuestion();
}


function completionScreen() {
  var container = document.getElementById("testcontainer");
    container.innerHTML = "";
  var resultsId = document.createAttribute("id");
    resultsId.value = "results";
  var resultsDiv = document.createElement("div");
  var resultsContainer = container.appendChild(resultsDiv);
    resultsContainer.setAttributeNode(resultsId);    
  var resultHeader =  document.createElement("h2")
    resultsContainer.appendChild(resultHeader)

    if (wrongCount < 4) {
        resultHeader.innerText = "You Passed";
        } else {
        resultHeader.innerText = "You Failed";
        }

  var right = 10 - wrongCount;
  var wrong = wrongCount;
    percent = (right / 10) * 100;

  var resultsRight = document.createElement("p");
    resultsContainer.appendChild(resultsRight);
    resultsRight.innerText = "You got " + right + " questions correct!";

  var resultsWrong = document.createElement("p");
    resultsContainer.appendChild(resultsWrong);
    resultsWrong.innerText = "you got " + wrong + " questions wrong!";

  var resultsPercent = document.createElement("p");
    resultsContainer.appendChild(resultsPercent);
    resultsPercent.innerText = "Your score is " + percent + "%";

  var retry = document.createElement("button");
    resultsContainer.appendChild(retry);
    retry.innerText = "Play Again";
    retry.onclick = restart;
    retry.classList.add("ui", "red", "button");

    getData();
}

function restart() {
  location.reload();
}

function start() {
    getQuestion();
    pickQuestion();
}

function pickQuestion() {
    question = questions[questionCount]
    answers = answers[questionCount]
    question = questions[questionCount]
    createQuestionElements(question, answers);
}
