var startBtn = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var answerEl = document.getElementById("answers");
var questionEl = document.getElementById("question");
var rightWrong = document.getElementById("right-wrong");
var finalScore = document.getElementById("final-score");
var initialID = document.getElementById("initial");
var submitBtn = document.getElementById("submit");
var questionIndex = 0;
var timeLeft = 91;
var score = 0;
var penalty = 10;


// questions and answers
var questions = [
    {
      q: "What is the process of finding errors and fixing them within a program?",
      s: ["Debugging", "Scanning", "Executing", "Compiling"],
      a: "Debugging",
    },
  
    {
      q: "A loop that never ends is referred to as a what?",
      s: ["Recursive loop", "While loop", "Infinite loop", "for loop"],
      a: "Infinite loop",
    },
  
    {
      q: "Which command will stop an infinite loop?",
      s: ["Esc", "Ctrl - C", "Shift - C", "Alt - C"],
      a: "Ctrl - C",
    },
  
    {
      q: "During program development, software requirements specify what?",
      s: [
        "What the task is that the program must perform",
        "How the program will accomplish the task",
        "How to divide the task into subtasks",
        "How to test the program when it is done",
      ],
      a: "What the task is that the program must perform",
    },
  
    {
      q: "Which of the sets of statements below will add 1 to x if x is positive and subtract 1 from x if x is negative but leave x alone if x is 0?",
      s: [
        "If (x > 0) x++; else x--;",
        "If (x == 0) x = 0;else x++;x--;",
        "X++; x--;",
        "If (x > 0) x++; else if (x < 0) x--;",
      ],
      a: "If (x > 0) x++; else if (x < 0) x--;",
    },
  ];

hideResults();

// start quiz function
var startQuiz = function () {
    countdownTimer();
  
    questionChange();
  
    hideWelcome();
  };

//   hide the welcome page after the quiz starts to only show the questions
function hideWelcome(){
    document.getElementById("starting-page").style.display = "none";
}

function hideResults(){
    document.getElementById("results").style.display = "none";
}

function showResults(){
    document.getElementById("results").style.display = "block";
}

function hideTimer(){
    document.getElementById("timer").style.display = "none";
}

// timer function
  function countdownTimer() {
    var timeInterval = setInterval(function () {
      if (questionIndex > 5 && timeLeft > 0) {
        timerEl.textContent = timeLeft;
      } else if (timeLeft > 0 && questionIndex < 5) {
        timeLeft--;
        timerEl.textContent = timeLeft;
      } else if (timeLeft === 0 && questionIndex < 5) {
        clearInterval(timeInterval);
        window.alert("Your time is up!");
        endQuiz();
      } else if (questionIndex === 5 || timeLeft === 0) {
        clearInterval(timeInterval);
        document.getElementById("question").style.display = "none";
      }
    }, 1000);
  }



// question function here
function questionChange() {
    
    var currentQuestion = questions[questionIndex];
    questionEl.innerText = currentQuestion.q;
    for (var i = 0; i < currentQuestion.s.length; i++) {
      var correctAnswer = currentQuestion.a;
      var answer = document.createElement("button");
      answer.classList.add("answer");
      var answerText = currentQuestion.s[i];
      answer.innerText = answerText;
      answer.setAttribute("value", answerText);
      answerEl.appendChild(answer);
      answer.addEventListener("click", function () {
        // console.log(this.value);
        if (this.value == correctAnswer) {
            alert("Good Job! You got it correct")
        //   rightWrong.removeAttribute("hidden");
        //   rightWrong.textContent = "Good Job! You got it correct";
        } else {
            alert("Sorry, that was incorrect")
        //   rightWrong.removeAttribute("hidden");
        //   rightWrong.textContent = "Sorry, that was incorrect";
          
          timeLeft -= penalty;
        }
  
        // hide previous answers but show current ones
        let allAnswers = document.querySelectorAll(".answer");
        allAnswers[0].remove();
        allAnswers[1].remove();
        allAnswers[2].remove();
        allAnswers[3].remove();
  
        questionIndex++;
        if(questionIndex < 5){
        questionChange()
        } 
        else {
          endQuiz()
        }
      });
    }
  }



// timeLeft is showing the correct time in local storage
 var endQuiz = function() {
    showResults()
    hideTimer()
      localStorage.setItem("Score", timeLeft);
      localStorage.getItem("Score", timeLeft);
      finalScore.textContent =  timeLeft
  }



    // enter initials and save them to local storage
function scoreScreen() {
    var input = document.createElement("initial");
    var body = document.body;
    var finalScore = timeLeft;
    var submit = document.createElement("button");
  
    initialID.textContent = finalScore;
    body.appendChild(h2El);
  
    input.setAttribute("id", "initial");
    input.placeholder = "Initials";
    body.appendChild(input);
  
    submit.className = "questionChoices";
    submit.textContent = "Submit";
    body.appendChild(submit);
  
    submit.addEventListener("click", function (event) {
      event.preventDefault();
  
      userInput.push(initials.value);
      storeScore();
      var Final = {
        Name: userInput,
        Score: timeLeft,
      };
      scores.push(Final);
      localStorage.setItem("Quiz Score", JSON.stringify(scores));
      scorePage();
    });
  }
  
//   {
//     var nameInput = document.getElementById("submit").textContent;
//     console.log(nameInput)

// localStorage.setItem(nameInput)
// }

function storeScore() {
    localStorage.setItem("Name", [userInput]);
    localStorage.setItem("Score", timeLeft);
  }


startBtn.addEventListener("click", startQuiz)