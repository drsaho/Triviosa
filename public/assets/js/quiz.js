const form = document.getElementById("quizForm");
const quizContainer = document.getElementById("quizContainer");
const quizTitle = document.getElementById("quizTitle"); // Assuming you have this element for initial title
const overlay = document.getElementById("overlay");
const exitConfirmationModal = document.getElementById("exitConfirmationModal");
const confirmExitButton = document.getElementById("confirmExit");
const cancelExitButton = document.getElementById("cancelExit");

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

// Function to fetch quiz categories from Open Trivia API
function fetchCategories() {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.trivia_categories;
      const selectElement = document.getElementById("categories");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
}

// Function to display the quiz
function displayQuiz(quizData) {
  showQuestion();
}

function showQuestion() {
  quizContainer.innerHTML = ""; // Clear previous content

  const questionData = quizData[currentQuestionIndex];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionElement = document.createElement("h3");
  questionElement.classList.add("question-style");
  questionElement.innerHTML = `Q${currentQuestionIndex + 1}: ${questionData.question}`;
  questionDiv.appendChild(questionElement);

  const answersList = document.createElement("ul");
  answersList.classList.add("answers");

  const answers = [...questionData.incorrect_answers, questionData.correct_answer];
  answers.sort(() => Math.random() - 0.5); // Shuffle the answers

  answers.forEach((answer) => {
    const answerItem = document.createElement("li");
    answerItem.classList.add("answer-item");
    answerItem.innerHTML = `<label><input type="radio" name="question" value="${answer}"> ${answer}</label>`;
    answersList.appendChild(answerItem);
  });

  questionDiv.appendChild(answersList);
  quizContainer.appendChild(questionDiv);

  answersList.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
      checkAnswer(event.target.value, questionData.correct_answer);
    }
  });
}

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    correctAnswersCount++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.innerHTML = `You answered ${correctAnswersCount} out of ${quizData.length} questions correctly!`;
}

// Call fetchCategories when the page loads
fetchCategories();