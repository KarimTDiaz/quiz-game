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

let currentQuestion;
let possibleAnswers;
let correctAnswer;
let currentTheme;

const filteredQuestion = () =>
  allQuestions.filter(question => !question.hasAnswered);

const printQuestion = () => {
  answerContainerElement.innerHTML = '';
  questionElement.textContent = allQuestions[currentQuestion].question;
  const questionFragment = document.createDocumentFragment();
  possibleAnswers = allQuestions[currentQuestion].answers.options;

  possibleAnswers.forEach((answer, index) => {
    const answersContainers = document.createElement('p');
    answersContainers.textContent = possibleAnswers[index];
    answersContainers.classList.add('answer');
    questionFragment.append(answersContainers);
  });

  answerContainerElement.append(questionFragment);
};

const selectRandomQuestion = () => {
  const questionNotAnswered = filteredQuestion();
  let randomQuestion;
  randomQuestion = Math.floor(Math.random() * questionNotAnswered.length);

  currentQuestion = randomQuestion;

  printQuestion();
};

const updateScore = () => {
  document.getElementById(`${currentTheme}-score`).textContent =
    score[currentTheme];
};

const checkAnswer = answer => {
  correctAnswer = allQuestions[currentQuestion].answers.correctAnswer;
  currentTheme = allQuestions[currentQuestion].theme;
  if (answer.textContent === possibleAnswers[correctAnswer]) {
    score[allQuestions[currentQuestion].theme]++;
    updateScore();
  }

  selectRandomQuestion();
};

answerContainerElement.addEventListener('click', ev => {
  checkAnswer(ev.target);
});

startButtonElement.addEventListener('click', () => {
  startButtonElement.classList.add('button-display');
  selectRandomQuestion();
});
