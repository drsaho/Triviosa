document.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById("quizForm");
    const quizContainer = document.getElementById("quizContainer");
    const quizTitle = document.getElementById("quizTitle");
    const overlay = document.getElementById("overlay");
    const exitConfirmationModal = document.getElementById("exitConfirmationModal");
    const confirmExitButton = document.getElementById("confirmExit");
    const cancelExitButton = document.getElementById("cancelExit");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Hide the quiz generator form and show the quiz container
        form.style.display = "none";
        quizContainer.style.display = "block";
        quizTitle.style.display = "none";
        overlay.style.display = "block";

        // Default parameter variables
        const count = 10; // not to be edited for now
        const quizCategory = document.getElementById("categories").value;
        const quizDifficulty = document.getElementById("difficulty").value;
        const quizType = document.getElementById("type").value;

        // URL construction
        const baseUrl = "https://opentdb.com/api.php?";
        const urlParameters = `amount=${count}&category=${quizCategory}&difficulty=${quizDifficulty}&type=${quizType}`;
        const quizUrl = `${baseUrl}${urlParameters}`;

        fetch(quizUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response is not okay: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const quizData = data.results;
            displayQuiz(quizData);
        })
        .catch((error) => {
            console.error("Error fetching quiz data: ", error);
        });
    });

    // Add event listener to the overlay to detect clicks outside the quiz container
    overlay.addEventListener("click", () => {
        // Show the exit confirmation modal
        exitConfirmationModal.style.display = "block";
    });

    confirmExitButton.addEventListener("click", () => {
        // Reset the quiz and show the quiz generator form
        form.style.display = "block";
        quizContainer.style.display = "none";
        quizTitle.style.display = "block";
        overlay.style.display = "none";
        quizContainer.innerHTML = "";
        exitConfirmationModal.style.display = "none";
    });

    cancelExitButton.addEventListener("click", () => {
        // Hide the exit confirmation modal
        exitConfirmationModal.style.display = "none";
    });
});

function displayQuiz(quizData) {
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    const quizContainer = document.getElementById("quizContainer");

    function showQuestion() {
        quizContainer.innerHTML = ""; // Clear any existing quiz content

        const questionData = quizData[currentQuestionIndex];
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionElement = document.createElement("h3");
        questionElement.classList.add("question-style");
        questionElement.innerHTML = `Q${currentQuestionIndex + 1}: ${questionData.question}`;
        questionDiv.appendChild(questionElement);

        const answersList = document.createElement("ul");
        answersList.classList.add("answers");

        const answers = [ ...questionData.incorrect_answers, questionData.correct_answer ];
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

        document.querySelectorAll(".answer-item").forEach((item) => {
            item.addEventListener("mouseenter", () => {
                item.classList.add("hover");
            });
            item.addEventListener("mouseleave", () => {
                item.classList.remove("hover");
            });
        });
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        document.querySelectorAll(".answer-item").forEach((item) => {
            const input = item.querySelector("input");
            if (input.value === correctAnswer) {
                item.classList.add("correct");
            } else {
                item.classList.add("incorrect");
            }
            input.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {
            correctAnswersCount++;
            setTimeout(nextQuestion, 1500);
        } else {
            setTimeout(nextQuestion, 2000);
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        const score = (correctAnswersCount / quizData.length) * 100;
        if (score >= 70) {
            quizContainer.innerHTML = `<p class="success callout">Congratulations! You passed with a score of ${score}%. You win!</p>`;
        } else {
            quizContainer.innerHTML = `<p class="alert callout">Sorry, you scored ${score}%. You lose. Better luck next time!</p>`;
        }
    }

    showQuestion();
}
