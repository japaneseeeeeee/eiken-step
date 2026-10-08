const questionBank = window.QUESTION_BANK || [];
let questions = [];
let questionIds = [];

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
  reviewList: document.querySelector("#reviewList")
};

const savedQuiz = window.EikenProgress.read().quiz || {};
let quizTotals = {
  answered: Number(savedQuiz.answered) || 0,
  correct: Number(savedQuiz.correct) || 0,
  bestScore: Number(savedQuiz.bestScore) || 0
};
let lastQuestionIds = Array.isArray(savedQuiz.lastQuestionIds) ? savedQuiz.lastQuestionIds : [];
let currentQuestion = 0;
let score = 0;
let mistakes = [];
let answered = false;
let selectedAnswer = null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function pickRandomQuestionIds(count) {
  const allIds = questionBank.map((_, index) => index);
  const previousIds = new Set(lastQuestionIds);
  const freshIds = allIds.filter((id) => !previousIds.has(id));
  const pool = freshIds.length >= count ? freshIds : allIds;
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

function saveSession() {
  const mistakeIds = mistakes.map((question) => questionBank.indexOf(question)).filter((id) => id >= 0);
  window.EikenProgress.updateSection(
    "quiz",
    {
      ...quizTotals,
      lastQuestionIds,
      session: {
        questionIds,
        currentQuestion,
        score,
        mistakeIds,
        answered,
        selectedAnswer
      }
    },
    {
      href: "quiz.html?resume=1",
      title: "4択問題の続き",
      detail: `${currentQuestion + 1} / ${questions.length}・正解 ${score}`
    }
  );
}

function startQuiz() {
  questionIds = pickRandomQuestionIds(10);
  lastQuestionIds = [...questionIds];
  questions = questionIds.map((id) => questionBank[id]);
  currentQuestion = 0;
  score = 0;
  mistakes = [];
  answered = false;
  selectedAnswer = null;
  showScreen("quiz");
  renderQuestion();
  saveSession();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  if (!question) return;
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

  if (answered && Number.isInteger(selectedAnswer)) renderAnsweredState(selectedAnswer);
  elements.questionHeading.focus({ preventScroll: true });
}

function renderAnsweredState(index) {
  const question = questions[currentQuestion];
  const isCorrect = index === question.answer;
  const buttons = [...elements.choices.querySelectorAll(".choice")];

  buttons.forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.answer) button.classList.add("correct");
    if (choiceIndex === index && !isCorrect) button.classList.add("incorrect");
  });

  elements.feedbackIcon.textContent = isCorrect ? "✓" : "×";
  elements.feedbackIcon.className = `feedback-icon ${isCorrect ? "correct" : "incorrect"}`;
  elements.feedbackResult.textContent = isCorrect ? "正解です" : "惜しい！ 正解は";
  elements.feedbackAnswer.textContent = `${String.fromCharCode(65 + question.answer)}. ${question.choices[question.answer]}`;
  elements.feedbackExplanation.textContent = question.explanation;
  elements.feedbackTranslation.textContent = `訳：${question.translation}`;
  elements.next.textContent = currentQuestion === questions.length - 1 ? "結果を見る" : "次の問題へ";
  elements.feedback.hidden = false;
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  selectedAnswer = index;

  const question = questions[currentQuestion];
  const isCorrect = index === question.answer;
  quizTotals.answered += 1;
  if (isCorrect) {
    score += 1;
    quizTotals.correct += 1;
  } else {
    mistakes.push(question);
  }

  elements.scoreText.textContent = `正解 ${score}`;
  renderAnsweredState(index);
  saveSession();
  elements.feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function goNext() {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    answered = false;
    selectedAnswer = null;
    renderQuestion();
    saveSession();
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

  quizTotals.bestScore = Math.max(quizTotals.bestScore, score);
  window.EikenProgress.updateSection(
    "quiz",
    { ...quizTotals, lastQuestionIds, session: null },
    {
      href: "quiz.html",
      title: "4択問題をもう一度",
      detail: `前回 ${score} / ${questions.length}・最高 ${quizTotals.bestScore}点`
    }
  );
  showScreen("result");
  document.querySelector("#resultTitle").focus({ preventScroll: true });
}

function restoreQuiz() {
  const session = savedQuiz.session;
  if (!session || !Array.isArray(session.questionIds) || session.questionIds.length !== 10) return false;
  if (!session.questionIds.every((id) => Number.isInteger(id) && questionBank[id])) return false;

  questionIds = [...session.questionIds];
  questions = questionIds.map((id) => questionBank[id]);
  currentQuestion = Math.min(Math.max(Number(session.currentQuestion) || 0, 0), questions.length - 1);
  score = Number(session.score) || 0;
  mistakes = (session.mistakeIds || []).map((id) => questionBank[id]).filter(Boolean);
  answered = Boolean(session.answered);
  selectedAnswer = Number.isInteger(session.selectedAnswer) ? session.selectedAnswer : null;
  showScreen("quiz");
  renderQuestion();
  return true;
}

elements.start.addEventListener("click", startQuiz);
elements.retry.addEventListener("click", startQuiz);
elements.next.addEventListener("click", goNext);
elements.home.addEventListener("click", () => { window.location.href = "index.html"; });
elements.quit.addEventListener("click", () => { window.location.href = "index.html"; });

if (new URLSearchParams(window.location.search).get("resume") === "1") restoreQuiz();
