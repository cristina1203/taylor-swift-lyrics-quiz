const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector("#save-score-btn");
const finalScore = document.querySelector("#final-score");
const mostRecentScore = localStorage.getItem('mostRecentScore');

// use local storage for high scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

// enable save button if username entered
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);
    highScores.sort((a, b) => {
        return b.score - a.score;
    })
    
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
}
