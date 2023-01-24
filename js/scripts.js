const QUESTIONS = {
  programming: [
    {
      question: '¿Cuántos tipos de bucles hay en programación?',
      answers: {
        options: ['1', '2', '3', '50'],
        correctAnswer: 1
      },
      theme: 'programming',
      hasAnswered: false
    },
    {
      question: '¿Cuántos lenguajes de programación entienden los navegadores?',
      answers: {
        options: ['3', '2', '1', '20'],
        correctAnswer: 2
      },
      theme: 'programming',
      hasAnswered: false
    }
  ],
  math: [
    {
      question: '¿Cuánto es 5 x 8?',
      answers: {
        options: ['40', '25', '30', '50'],
        correctAnswer: 0
      },
      theme: 'math',
      hasAnswered: false
    },
    {
      question: '¿Cuánto es la cuarta parte de la tercera parte?',
      answers: {
        options: ['Un doceavo', 'Un séptimo', '3/4 partes', '4/6 partes'],
        correctAnswer: 0
      },
      theme: 'math',
      hasAnswered: false
    }
  ],
  science: [
    {
      question: '¿En qué dirección apunta la aguja de una brújula?',
      answers: {
        options: ['Sur', 'Este', 'Oeste', 'Norte'],
        correctAnswer: 3
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Qué mineral se encuentra en una solución salina?',
      answers: {
        options: ['Potasio', 'Calcio', 'Sodio', 'Magnesio'],
        correctAnswer: 2
      },
      theme: 'science',
      hasAnswered: false
    },
    {
      question: '¿Cuántos huesos tiene un humano adulto?',
      answers: {
        options: ['412', '287', '306', '328'],
        correctAnswer: 2
      },
      theme:'science',
      hasAnswered: false
    }
  ],
  history: [
    {
      question: '¿En qué año piso el hombre la luna por primera vez?',
      answers: {
        options: ['1830', '1969', '2001', 'Fue un montaje'],
        correctAnswer: 1
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Dónde se inventó la pólvora?',
      answers: {
        options: ['China', 'Francia', 'EEUU', 'Italia'],
        correctAnswer: 0
      },
      theme: 'history',
      hasAnswered: false
    },
    {
      question: '¿Dónde originaron los juegos olímpicos?',
      answers: {
        options: ['Cuenca', 'Grecia', 'Alemania', 'Dublin'],
        correctAnswer: 1
      },
      theme: 'history',
      hasAnswered: false
    }
  ]
};

const allQuestions = [
  ...QUESTIONS.history,
  ...QUESTIONS.math,
  ...QUESTIONS.programming,
  ...QUESTIONS.science
];

const score = {
  programming: 0,
  math: 0,
  history: 0,
  science: 0
};

const startButtonElement = document.getElementById('start-button');
const remainingTimeElement = document.getElementById('remaining-time');
const questionElement = document.getElementById('game-question');
const answerContainerElement = document.getElementById('answers');
const resetGameElement = document.getElementById('reset-button');

let currentQuestion;
let possibleAnswers;
let correctAnswer;
let currentTheme;
let remainingTime;
let intervalId;
let lastQuestion = false

const setRemainingTime = () => {
  let remainingTime = 5;
  intervalId = setInterval(() => {
    remainingTime -= 0.1;
    remainingTimeElement.textContent = remainingTime.toFixed(2);
    if (remainingTime <= 0.1) {
      clearInterval(intervalId);
      selectRandomQuestion()
    }
  }, 100);
};

const printQuestion = () => {
  answerContainerElement.innerHTML = '';
  questionElement.textContent = currentQuestion.question;
  const questionFragment = document.createDocumentFragment();
  possibleAnswers = currentQuestion.answers.options;
  possibleAnswers.forEach((answer) => {
    const answersContainers = document.createElement('p');
    answersContainers.textContent = answer; //ESTO ES ANSWER CENUTRIO!!
    answersContainers.classList.add('answer');
    questionFragment.append(answersContainers);
  });
 
  answerContainerElement.append(questionFragment);
  setRemainingTime()
};

const filteredQuestion = () =>
  allQuestions.filter(question => !question.hasAnswered);

const selectRandomQuestion = () => {
  let questionNotAnswered = filteredQuestion();
  const randomQuestion = questionNotAnswered[Math.floor(Math.random() * questionNotAnswered.length)];
  if(questionNotAnswered.length === 1){
    lastQuestion = true
  } else{
    currentQuestion = randomQuestion
  }
  currentQuestion.hasAnswered = true;
  printQuestion();
  if(lastQuestion) endGame()
};

const updateScore = () => {
  document.getElementById(`${currentTheme}-score`).textContent =
    score[currentTheme];
};

const checkAnswer = answer => {
  /* selectRandomQuestion(); */
  correctAnswer = currentQuestion.answers.correctAnswer;
  currentTheme = currentQuestion.theme;
  if (answer.textContent === possibleAnswers[correctAnswer]) {
    score[currentTheme]++;
    updateScore();
  }
  if(!lastQuestion)selectRandomQuestion()
};

const endGame = () =>{
  questionElement.textContent = 'TERMINASTE'
  answerContainerElement.innerHTML= ''
  remainingTimeElement.classList.add('timer-display')
  const finalScoreElement = document.createElement('h2')
  finalScoreElement.classList.add('final-score')
  totalScore = Object.values(score).reduce((acc, current)=>
  current + acc
);

finalScoreElement.textContent = `Has acertado ${totalScore} preguntas de ${allQuestions.length}`
answerContainerElement.append(finalScoreElement)
resetGameElement.classList.add('reset-display')
}

const resetGame = () =>{
allQuestions.forEach(question => (question.hasAnswered = false))
for (const key in score) {
  score[key] = 0;
  document.getElementById(`${key}-score`).textContent = 0;
};
lastQuestion = false;
clearInterval(intervalId);
selectRandomQuestion();
}

answerContainerElement.addEventListener('click', ev => {
  clearInterval(intervalId);
  checkAnswer(ev.target);
});

startButtonElement.addEventListener('click', () => {
  startButtonElement.classList.add('button-display');
  selectRandomQuestion();
});

resetGameElement.addEventListener('click',() => {
  resetGame()
})
