var clearBtn = document.getElementById("clear");
var showScore = document.getElementById("score-list");
var storedScores = JSON.parse(localStorage.getItem("Quiz Score"));

function displayScore() {
    for (var i = 0; i < storedScores.length; i++) {
        var entries = document.createElement("li");
        entries.textContent = storedScores[i].Name + " - " + storedScores[i].Score;

        showScore.appendChild(entries);
    }
}

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear("Quiz Score", JSON.stringify(scores));
    document.getElementById("score-list").style.display = "none";
    document.getElementById("clear").style.display = "none";
    })

displayScore();