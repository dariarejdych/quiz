var url = "https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json";

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

var jsonString = getJSON(url);
var json = JSON.parse(jsonString);
var timeSeconds = json.time_seconds;

var questions = json.questions;

function drawQuestion(question) {

    var questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";
    var questionParagraph = document.createElement("p");
    questionParagraph.className = "sg-header-primary";
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
    for (i in questions) {
        var question = questions[i];
        drawQuestion(question);
    }
}

startQuiz();
