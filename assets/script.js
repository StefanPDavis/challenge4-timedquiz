let timeEl = document.querySelector(".time");
let secondsLeft = 75;
let totalScore = 0;
let questionCount = 1;
let questionNumber = 1;
let startBtn = document.querySelector("#start-button");
let questionPage = document.querySelector("#question-page");
let askQuestion = document.querySelector("#ask-question");
let introPage = document.querySelector("#intro-page");

var answerBtn1 = document.querySelector("#answer-btn1");
var answerBtn2 = document.querySelector("#answer-btn2");
var answerBtn3 = document.querySelector("#answer-btn3");
var answerBtn4 = document.querySelector("#answer-btn4");
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

var questions = [
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

        if (secondsLeft <= 0){
            clearInterval(timerInterval);
            timeEl.textContent = "Time's up!"; 
            finish.textContent = "Time's up!";
            gameOver();

        } else  if(questionCount >= questions.length +1) {
            clearInterval(timerInterval);
            gameOver();
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

function checkChoice(event) {
    event.preventDefault();
    checkAnswer.style.display = "block";
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);
    if (questions[questionNumber].answer == event.target.value) {
        checkAnswer.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        checkAnswer.textContent = "Incorrect";
    }
    if (questionNumber < questions.length -1 ) {
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
    timeEl.style.display = "none"; 
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
    scores.innerHTML = "";
    scores.style.display ="block";
    let highScores = sort();   
    let topFive = highScores.slice(0,5);
    for (let i = 0; i < topFive.length; i++) {
        let item = topFive[i];
    let li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scores.appendChild(li);
    }
};

function sort () {
    let unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addItem (n) {
    let addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

startBtn.addEventListener("click", startQuiz);

answerBtn1.addEventListener("click", checkChoice);
answerBtn2.addEventListener("click", checkChoice);
answerBtn3.addEventListener("click", checkChoice);
answerBtn4.addEventListener("click", checkChoice);

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
