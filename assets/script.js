let timeEl = document.querySelector(".time");
let secondsLeft = 75;
let totalScore = 0;
let questionCount = 1;
let questionNumber = 1;
let startBtn = document.querySelector("#start-button");
let questionPage = document.querySelector("#question-page");
let askQuestion = document.querySelector("#ask-question");
let introPage =document.querySelector("#intro-page");

let answerBtn1 = document.querySelector("#answer-btn1");
let answerBtn2 = document.querySelector("#answer-btn2");
let answerBtn3 = document.querySelector("#answer-btn3");
let answerBtn4 = document.querySelector("#answer-btn4");
var checkAnswer = document.querySelector("#check-answer");
let scoreBoard = document.querySelector("#submit-page");
let finalScore = document.querySelector("#final-score");
let userInitial =document.querySelector("#initial");

let submitBtn =document.querySelector("#submit-btn");
let highScorePage =document.querySelector("#highscore-page");
let scores =document.querySelector("#scores");
let viewHighScore =document.querySelector("#viewHighScore");
let finish =document.querySelector("#finish");
let backBtn =document.querySelector("#back-btn");
let clearBtn=document.querySelector("#clear-btn");
let reactButtons = document.querySelectorAll(".choices");

let questions = [
    {
        question: "Questions 1 : String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c"
    },
    {
        question: "Questions 2 : Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c"
    },
    {
        question: "Questions 3 : How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b"
    },
    {
        question: "Questions 4 : How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c"
    },
    {
        question: "Questions 5 : To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
        answer: "b"
    },
    {
        question: "Questions 6 : The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a"
    },
    {
        question: "Questions 7 : How to write an IF statement in JavaScript?",
        choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
        answer: "c"
    },
    {
        question: "Questions 8 : Which event occurs when the user clicks on an HTML element?",
        choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
        answer: "a"
    }
];

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

function startQuiz () {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    setTime();
    showQuestion(questionNumber);
}

function showQuestion (n) {
    askQuestion.textContent = questions[n].question;
    answerBtn1.textContent = questions[n].choices[0];
    answerBtn2.textContent = questions[n].choices[1];
    answerBtn3.textContent = questions[n].choices[2];
    answerBtn4.textContent = questions[n].choices[3];
    questionNumber = n;
}

function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);
    if (questionSource[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 5;
        checkLine.textContent = "Incorrect";
    }
    if (questionNumber < questionSource.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}

function gameOver() {

    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    finalScore.textContent = "Your final score is :" + totalScore ;
    timeLeft.style.display = "none"; 
};

function getScore () {
    let currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    let highScores = sort();   
    let topFive = highScores.slice(0,5);
    for (let i = 0; i < topFive.length; i++) {
        let item = topFive[i];
    let li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

function addItem (n) {
    let addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

startBtn.addEventListener("click", startQuiz);

reactButtons.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

viewHighScore.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});
