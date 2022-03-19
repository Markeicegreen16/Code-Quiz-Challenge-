var quizQuestions = [
    {
        question: "Commonly used data types Do Not Include:",
        choices: 
            ["Strings", 
            "Booleans",
            "Alerts", 
            "Numbers"],

        answer: "Booleans"
        
    },
    {
        question: "The condition in an if/else statement is enclosed with _____:",
        choices: 
            ["Parenthesis", 
            "Square Brackets", 
            "Quotes", 
            "Curly Brackets"],

        answer: "Curly Brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store_____:",
        choices: 
            ["Other Arrays", 
            "Booleans", 
            "Numbers and Strings", 
            "All of the above"],

        answer: "All of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables:",
        choices: 
            ["Parenthesis", 
            "Commas", 
            "Quotes", 
            "Curly Brackets"],

        answer: "Quotes"
    },
    {
        question: "Commonly used data types Do Not Include:",
        choices: 
            ["JavaScript", 
            "Terminal/Bash", 
            "For Loops", 
            "Console.log"],

        answer: "For Loops)"
}]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

    timeLeft = 85;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}


function endGame() {
    clearInterval(timer);
    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` out of 5 questions correct!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 15; 
    next();
}

function correct() {
    score += 20;
    next();
}
 
function next() {
    currentQuestion++;

    if (currentQuestion > quizQuestions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + quizQuestions[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < quizQuestions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", quizQuestions[currentQuestion].choices[buttonLoop]);
        if (quizQuestions[currentQuestion].choices[buttonLoop] === quizQuestions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}