const questionBank = window.QUESTION_BANK || [];
let questions = [];

const screens = {
  home: document.querySelector("#homeScreen"),
  quiz: document.querySelector("#quizScreen"),
  result: document.querySelector("#resultScreen")
};

const elements = {
  start: document.querySelector("#startButton"),
  quit: document.querySelector("#quitButton"),
  next: document.querySelector("#nextButton"),
  retry: document.querySelector("#retryButton"),
  home: document.querySelector("#homeButton"),
  progressText: document.querySelector("#progressText"),
  scoreText: document.querySelector("#scoreText"),
  progressBar: document.querySelector("#progressBar"),
  progressTrack: document.querySelector(".progress-track"),
  questionNumber: document.querySelector("#questionNumber"),
  questionHeading: document.querySelector("#questionHeading"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  feedbackIcon: document.querySelector("#feedbackIcon"),
  feedbackResult: document.querySelector("#feedbackResult"),
  feedbackAnswer: document.querySelector("#feedbackAnswer"),
  feedbackExplanation: document.querySelector("#feedbackExplanation"),
  feedbackTranslation: document.querySelector("#feedbackTranslation"),
  scoreRing: document.querySelector("#scoreRing"),
  finalScore: document.querySelector("#finalScore"),
  resultMessage: document.querySelector("#resultMessage"),
  accuracy: document.querySelector("#accuracy"),
  correctCount: document.querySelector("#correctCount"),
  reviewCount: document.querySelector("#reviewCount"),
  reviewSection: document.querySelector("#reviewSection"),
  reviewList: document.querySelector("#reviewList")
};

let currentQuestion = 0;
let score = 0;
let mistakes = [];
let answered = false;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  questions = [...questionBank].sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuestion = 0;
  score = 0;
  mistakes = [];
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const question = questions[currentQuestion];
  const number = currentQuestion + 1;

  elements.progressText.textContent = `${number} / ${questions.length}`;
  elements.scoreText.textContent = `正解 ${score}`;
  elements.progressBar.style.width = `${(number / questions.length) * 100}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(number));
  elements.progressTrack.setAttribute("aria-valuemax", String(questions.length));
  elements.questionNumber.textContent = `QUESTION ${String(number).padStart(2, "0")}`;
  elements.questionHeading.textContent = question.sentence;
  elements.feedback.hidden = true;
  elements.choices.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${choice}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    elements.choices.appendChild(button);
  });

  elements.questionHeading.focus({ preventScroll: true });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestion];
  const isCorrect = selectedIndex === question.answer;
  const buttons = [...elements.choices.querySelectorAll(".choice")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("incorrect");
  });

  if (isCorrect) {
    score += 1;
    elements.feedbackIcon.textContent = "✓";
    elements.feedbackIcon.className = "feedback-icon correct";
    elements.feedbackResult.textContent = "正解です";
  } else {
    mistakes.push(question);
    elements.feedbackIcon.textContent = "×";
    elements.feedbackIcon.className = "feedback-icon incorrect";
    elements.feedbackResult.textContent = "惜しい！ 正解は";
  }

  elements.scoreText.textContent = `正解 ${score}`;
  elements.feedbackAnswer.textContent = `${String.fromCharCode(65 + question.answer)}. ${question.choices[question.answer]}`;
  elements.feedbackExplanation.textContent = question.explanation;
  elements.feedbackTranslation.textContent = `訳：${question.translation}`;
  elements.next.textContent = currentQuestion === questions.length - 1 ? "結果を見る" : "次の問題へ";
  elements.feedback.hidden = false;
  elements.feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function goNext() {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    renderResult();
  }
}

function renderResult() {
  const percent = Math.round((score / questions.length) * 100);
  elements.finalScore.textContent = String(score);
  elements.accuracy.textContent = `${percent}%`;
  elements.correctCount.textContent = `${score}問`;
  elements.reviewCount.textContent = `${mistakes.length}問`;
  elements.scoreRing.style.background = `conic-gradient(var(--blue) ${percent}%, #dfe9f1 ${percent}%)`;

  if (score === questions.length) {
    elements.resultMessage.textContent = "全問正解です。この調子で語彙を増やしていきましょう。";
  } else if (score >= 7) {
    elements.resultMessage.textContent = "よくできました。間違えた単語を確認すれば、さらに力がつきます。";
  } else {
    elements.resultMessage.textContent = "ここから伸びます。解説を読み、もう一度挑戦してみましょう。";
  }

  elements.reviewList.innerHTML = "";
  if (mistakes.length === 0) {
    const message = document.createElement("div");
    message.className = "perfect-message";
    message.textContent = "復習が必要な問題はありません。全問正解、お見事です！";
    elements.reviewList.appendChild(message);
  } else {
    mistakes.forEach((question) => {
      const item = document.createElement("article");
      item.className = "review-item";
      const answer = question.choices[question.answer];
      item.innerHTML = `<p><strong>${answer}</strong> — ${question.explanation}</p><p class="review-sentence">${question.sentence.replace("(　　　)", answer)}</p>`;
      elements.reviewList.appendChild(item);
    });
  }

  showScreen("result");
  document.querySelector("#resultTitle").focus({ preventScroll: true });
}

elements.start.addEventListener("click", startQuiz);
elements.retry.addEventListener("click", startQuiz);
elements.next.addEventListener("click", goNext);
elements.home.addEventListener("click", () => { window.location.href = "index.html"; });
elements.quit.addEventListener("click", () => { window.location.href = "index.html"; });
