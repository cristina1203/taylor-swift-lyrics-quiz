const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progress-text");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progress-bar-full");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    // if no more questions, set score and finish game 
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    // update question number and progress bar percentage
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    // randomly pick new question from questions and update text
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = "\"" + currentQuestion.question + "\"";

    // set each choice text to corresponding answer choices
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // remove current question from array of available questions 
    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // check if answer is correct or not
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // add points if answer is correct
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        // add class based on answer correctness to change style
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score;
}

startGame();