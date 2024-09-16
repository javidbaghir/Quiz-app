const questions = [
  {
    question: "Azərbaycan Respublikasının paytaxtı hansıdır?",
    answers: [
      {
        text: "Gəncə",
        correct: false,
      },
      {
        text: "Sumqayıt",
        correct: false,
      },
      {
        text: "Bakı",
        correct: true,
      },
      {
        text: "Naxçıvan",
        correct: false,
      },
    ],
  },

  {
    question: "Yer kürəsinin hansı qitəsi ən böyüyüdür?",
    answers: [
      {
        text: "Avropa",
        correct: false,
      },
      {
        text: "Afrika",
        correct: false,
      },
      {
        text: "Asiya",
        correct: true,
      },
      {
        text: "Amerika",
        correct: false,
      },
    ],
  },

  {
    question: "Hansı ölkə dünyanın ən böyük əraziyə malikdir?",
    answers: [
      {
        text: "Rusiya",
        correct: true,
      },
      {
        text: "Çin",
        correct: false,
      },
      {
        text: "ABŞ",
        correct: false,
      },
      {
        text: "Kanada",
        correct: false,
      },
    ],
  },

  {
    question: "İnsanın bədənində neçə sümük var?",
    answers: [
      {
        text: "196",
        correct: false,
      },
      {
        text: "206",
        correct: true,
      },
      {
        text: "226",
        correct: false,
      },
      {
        text: "156",
        correct: false,
      },
    ],
  },

  {
    question: "Hansı planet Günəş sistemində ən böyükdür?",
    answers: [
      {
        text: "Yupiter",
        correct: true,
      },
      {
        text: "Yer",
        correct: false,
      },
      {
        text: "Venera",
        correct: false,
      },
      {
        text: "Saturn",
        correct: false,
      },
    ],
  },
];

const question = document.getElementById("question");
const answersButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
const questionNum = document.getElementById("questionNo");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestions();
}

const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

function showQuestions() {
  reserState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + ". " + currentQuestion.question;
  questionNum.innerHTML = questionNo + "/" + questions.length;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", function (e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";

      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++

      } else {
        selectedBtn.classList.add("inCorrect");
      }

      Array.from(answersButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }

        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
}

nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;

    showQuestions();
   
  } else {

    reserState()
    question.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
    nextButton.addEventListener('click', function() {
        startQuiz()
    })
  }

});

function reserState() {
  nextButton.style.display = "none";

  while (answersButtons.firstChild) {
    answersButtons.removeChild(answersButtons.firstChild);
  }
}

startQuiz();
