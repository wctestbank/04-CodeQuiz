
var timerEl = document.querySelector("#start-button")
var timerInstances = 0;


// countdown timer
var timerCountdown = function (event) {

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

timerEl.addEventListener("click", timerCountdown)