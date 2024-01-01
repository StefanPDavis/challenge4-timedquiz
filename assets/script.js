let timeEl = document.querySelector(".time");
let secondsLeft = 3;

function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "Time's up!";
}

setTime();