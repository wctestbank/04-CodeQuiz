
var timerEl = document.querySelector("#start-button");
var timerInstances = 0;

// global timer variable
var currentPosition = 90;

var introEl = document.querySelector("#intro");
var questionEl = document.querySelector("#question");
var endEl = document.querySelector("#quizDone");

var playerScore = 0;

var highScores = [];

// array of questions

var questionPool =
    [
        {
            question: "A useful tool used for printing content to the debugger is:",
            option1: "Javascript",
            option2: "terminal",
            option3: "DOM",
            option4: "console.log",
            correct: "4"
        },

        {
            question: "Commonly used data types do not include:",
            option1: "strings",
            option2: "booleans",
            option3: "alerts",
            option4: "numbers",
            correct: "3"
        },

        {
            question: "The condition in an if / else statement is enclosed with ___:",
            option1: "quotes",
            option2: "curly brackets",
            option3: "parenthesis",
            option4: "square brackets",
            correct: "3"
        },

        {
            question: "Arrays in JavaScript can be used to store ___:",
            option1: "numbers and strings",
            option2: "other arrays",
            option3: "booleans",
            option4: "all of the above",
            correct: "4"
        },

        {
            question: "String values must be enclosed within ___ when being assigned:",
            option1: "commas",
            option2: "curly brackets",
            option3: "quotes",
            option4: "parenthesis",
            correct: "3"
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
    // remember to change back to 90
    currentPosition = 10;

    var timerText = document.querySelector("#timerText");

    // updates timer every second
    var countDown = setInterval(function () {
        timerText.textContent = currentPosition;

        if (currentPosition <= 0) {
            clearInterval(countDown);
            // allows another timer to run
            timerInstances = 0;
            timerText.textContent = 0;
            endQuiz();
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


    // check if button is clicked, if not exits function
    if (!event.target.value) {
        return;
    }

    if (event.target.value === questionPool[currentQuestion].correct) {
        questionEl.querySelector("#questionResult").textContent = "Correct";
        playerScore++;
        questionEl.querySelector("#score").textContent = "Current Score: " + playerScore;
    }

    else {
        currentPosition -= 5;
        questionEl.querySelector("#questionResult").textContent = "Wrong";
    }

    currentQuestion = randomQuestion();

    populateQuestion(currentQuestion);

};

// generates random number to decide of question
var randomQuestion = function () {
    return Math.floor(Math.random() * questionPool.length);
};


// populates question fields with current question
var populateQuestion = function (questionNumber) {

    questionEl.querySelector("#questionText").textContent = questionPool[questionNumber].question;

    questionEl.querySelector("#a1").textContent = questionPool[questionNumber].option1;
    questionEl.querySelector("#a2").textContent = questionPool[questionNumber].option2;
    questionEl.querySelector("#a3").textContent = questionPool[questionNumber].option3;
    questionEl.querySelector("#a4").textContent = questionPool[questionNumber].option4;

};

var endQuiz = function () {
    questionEl.hidden = true;
    endEl.hidden = false;

    endEl.querySelector("#finalScore").textContent = "Your final score is " + playerScore;
};

var submitQuiz = function (event) {
    
    if (event.target.value != "submit") {
        return;
    }

    var userInitials = endEl.querySelector("#initials").value;

    if (!userInitials){
        alert("Please enter initials");
        return;
    }

    var scoreObj = {
        initials: userInitials,
        score: playerScore
    };

    highScores.push(scoreObj);
    saveScores();

    
};


// saving and loading high scores functions
var saveScores = function(){
    localStorage.setItem("userScores", JSON.stringify(highScores));
};

var loadScores = function(){
    var savedScores = localStorage.getItem("userScores");

    if(!savedScores){
        return false;
    }

    highScores = JSON.parse(savedScores);
};

loadScores();

timerEl.addEventListener("click", startQuiz);
questionEl.addEventListener("click", quizOperation);
endEl.addEventListener("click", submitQuiz);