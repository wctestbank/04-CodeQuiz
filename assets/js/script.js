
var timerEl = document.querySelector("#start-button");
var timerInstances = 0;

var introEl = document.querySelector("#intro");
var questionEl = document.querySelector("#question");

// array of questions

var questionPool =
    [
        {
            question: "Test",
            option1: "Test 1",
            option2: "Test 2",
            option3: "Test 3",
            option4: "Test 4",
            correct: 1
        }
    ];

// tracker for current question in pool
var currentQuestion = 0;


// countdown timer
var timerCountdown = function () {

    // prevents multiple instances of timer
    if (timerInstances === 1) {
        return;
    }
    else {
        timerInstances = 1;
    }

    var currentPosition = 90;

    var timerText = document.querySelector("#timerText");

    // updates timer every second
    var countDown = setInterval(function () {
        timerText.textContent = currentPosition;

        if (currentPosition === 0) {
            clearInterval(countDown);
            // allows another timer to run
            timerInstances = 0;
        }

        currentPosition--;
    }, 1000);

};

// switches to quiz from intro
var startQuiz = function () {
    introEl.hidden = true;
    questionEl.hidden = false;
    timerCountdown();

    currentQuestion = randomQuestion();

    populateQuestion(currentQuestion);

};

// main handling of quiz
var quizOperation = function (event) {

    if (event.target.value) {
        var userAnswer = event.target.value;
        console.log(userAnswer);
    }
};

var randomQuestion = function () {
    return Math.floor(Math.random() * questionPool.length);
};

var populateQuestion = function (questionNumber) {

    // populates question fields with current question
    questionEl.querySelector("#questionText").textContent = questionPool[questionNumber].question;

    questionEl.querySelector("#a1").textContent = questionPool[questionNumber].option1;
    questionEl.querySelector("#a2").textContent = questionPool[questionNumber].option2;
    questionEl.querySelector("#a3").textContent = questionPool[questionNumber].option3;
    questionEl.querySelector("#a4").textContent = questionPool[questionNumber].option4;

};

timerEl.addEventListener("click", startQuiz);
questionEl.addEventListener("click", quizOperation);