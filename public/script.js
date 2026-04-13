const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "2. Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "3. Which language is used for web app logic?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "4. What is the default port for a Node.js Express app in your project?",
    options: ["8080", "5000", "3000", "27017"],
    answer: "3000"
  },
  {
    question: "5. Which tool is used for containerization?",
    options: ["Git", "Docker", "Jenkins", "Terraform"],
    answer: "Docker"
  }
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");

function loadQuiz() {
  quizContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    let optionsHtml = "";
    q.options.forEach((option) => {
      optionsHtml += `
        <label>
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        </label>
      `;
    });

    questionDiv.innerHTML = `
      <h3>${q.question}</h3>
      ${optionsHtml}
    `;

    quizContainer.appendChild(questionDiv);
  });
}

submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
      score++;
    }
  });

  result.textContent = `Your Score: ${score} / ${quizData.length}`;
});

loadQuiz();