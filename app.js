var url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";
var jsonString = getJSON(url);
var json = JSON.parse(jsonString);
var timeSeconds = json.time_seconds;
var questions = json.questions;
var interval;

function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }
    return resp;
}



function drawQuestion(question) {

    var questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";
    var questionParagraph = document.createElement("p");
    questionParagraph.className = "sg-header-primary quiz-question-style";
    questionParagraph.innerHTML = question.question;
    questionDiv.appendChild(questionParagraph);


    drawAnswersForQuestionInForm(question, questionDiv);

    var element = document.getElementById("quiz");
    element.appendChild(questionDiv);
}

function drawAnswersForQuestionInForm(question, questionDiv) {
    var answers = question.answers;
    console.log(question);
    for (i in answers) {
        var answer = answers[i];
        console.log(answer);
        var answerDiv = document.createElement("div");
        answerDiv.className = "quiz-answers sg-text--gray";
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = question.id.toString();
        radio.id = question.id.toString() + answer.id.toString();
        radio.value = "myradio1";
        answerDiv.appendChild(radio)

        var objLabel = document.createElement("label");
        objLabel.htmlFor = radio.id;
        var span = document.createElement("span");
        objLabel.appendChild(span);
        objLabel.innerHTML = objLabel.innerHTML + answer.answer

        answerDiv.appendChild(objLabel);
        questionDiv.appendChild(answerDiv);

    }
}

function startQuiz() {

    var timeToEnd = timeSeconds;
    interval = setInterval(function() {
        if (timeToEnd == 0) {
            submitQuiz();
            return;
        }
        timeToEnd--;
        var minutes = parseInt(timeToEnd / 60);
        var seconds = timeToEnd % 60;
        console.log(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    var quizButton = document.getElementById("quiz-button");
    // var quizButtonStart = document.getElementById("quiz-button-start");
    // quizButton.removeChild(quizButtonStart);
    document.body.removeChild(quizButton);
    var quizDiv = document.createElement("div");
    quizDiv.id = "quiz";
    document.body.appendChild(quizDiv);


    for (i in questions) {
        var question = questions[i];
        drawQuestion(question);
    }

    var quizConteiner = document.getElementById("quiz");
    var submitButton = document.createElement("button");
    submitButton.onclick = submitQuiz;
    submitButton.innerHTML = "Zakończ i wyślij";
    quizConteiner.appendChild(submitButton);

}

function submitQuiz() {
    clearInterval(interval);
    var correctAnswersCount = 0;
    var questions = json.questions;
    for (questionIndex in questions) {
        var question = questions[questionIndex]
        var answers = question.answers;
        for (answerIndex in answers) {
            var answer = answers[answerIndex]
            var radioInput = document.getElementById(question.id.toString() + answer.id.toString())
            if (answer.correct == true && radioInput.checked == true) {
                correctAnswersCount++;
            }
        }
    }
    var quizConteiner = document.getElementById("quiz");
    document.body.removeChild(quizConteiner);
    console.log("Odpowiedziałeś poprawnie na " + correctAnswersCount + " z " + questions.length + " pytań");

    var countCorrect = document.createElement("div");
    countCorrect.id = "quiz-button";
    document.body.appendChild(countCorrect);
    var countCorrectPara = document.createElement("p");
    countCorrect.appendChild(countCorrectPara);
    countCorrectPara.innerHTML = "Odpowiedziałeś poprawnie na " + correctAnswersCount + " z " + questions.length + " pytań";

    var tryAgainButton = document.createElement("button");
    tryAgainButton.onclick = startQuiz;
    tryAgainButton.innerHTML = "Spróbuj ponownie";
    countCorrect.appendChild(tryAgainButton);
}

// startQuiz();
