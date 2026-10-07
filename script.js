// 問題を追加するときは、この配列に同じ形式のオブジェクトを追加してください。
const questions = [
  {
    sentence: "The company plans to (　　　) a new service for international customers next spring.",
    choices: ["launch", "borrow", "refuse", "solve"],
    answer: 0,
    explanation: "launch は「（商品・サービスなどを）開始する、発売する」という意味です。",
    translation: "その会社は来春、海外の顧客向けに新しいサービスを開始する予定です。"
  },
  {
    sentence: "Mika was (　　　) to hear that she had passed the difficult exam.",
    choices: ["delighted", "ordinary", "separate", "patient"],
    answer: 0,
    explanation: "be delighted to ～ で「～して大喜びする」という表現です。",
    translation: "ミカは難しい試験に合格したと聞いて大喜びしました。"
  },
  {
    sentence: "The city is trying to (　　　) the amount of plastic waste by encouraging recycling.",
    choices: ["reduce", "pretend", "compare", "deliver"],
    answer: 0,
    explanation: "reduce は「量や数を減らす」という意味です。reduce the amount of ～ で「～の量を減らす」です。",
    translation: "その市はリサイクルを奨励することで、プラスチックごみの量を減らそうとしています。"
  },
  {
    sentence: "Please (　　　) that all the windows are closed before you leave the building.",
    choices: ["make sure", "take place", "give up", "look after"],
    answer: 0,
    explanation: "make sure that ～ は「～であることを確かめる」という頻出表現です。",
    translation: "建物を出る前に、すべての窓が閉まっていることを確認してください。"
  },
  {
    sentence: "Because of the heavy snow, several flights were (　　　) until the next morning.",
    choices: ["postponed", "improved", "produced", "invited"],
    answer: 0,
    explanation: "postpone は「延期する」という意味です。ここでは受け身で「延期された」となります。",
    translation: "大雪のため、いくつかの便は翌朝まで延期されました。"
  },
  {
    sentence: "This medicine is very (　　　) in treating the symptoms of a cold.",
    choices: ["effective", "curious", "similar", "responsible"],
    answer: 0,
    explanation: "effective は「効果的な」という意味です。be effective in ～ing で「～するのに効果がある」です。",
    translation: "この薬は風邪の症状を治療するのにとても効果的です。"
  },
  {
    sentence: "Ken decided to (　　　) the job offer because he wanted to study abroad.",
    choices: ["turn down", "bring up", "put away", "call on"],
    answer: 0,
    explanation: "turn down は「申し出などを断る」という句動詞です。",
    translation: "ケンは留学したかったので、その仕事の申し出を断ることにしました。"
  },
  {
    sentence: "The museum has a large (　　　) of paintings from the nineteenth century.",
    choices: ["collection", "direction", "condition", "population"],
    answer: 0,
    explanation: "collection は「収集品、コレクション」です。a collection of ～ で「～のコレクション」となります。",
    translation: "その美術館には19世紀の絵画が多数収蔵されています。"
  },
  {
    sentence: "It is (　　　) that the train will arrive late because of the storm.",
    choices: ["likely", "aware", "equal", "private"],
    answer: 0,
    explanation: "It is likely that ～ は「～する可能性が高い」という表現です。",
    translation: "嵐のため、その電車は遅れて到着する可能性が高いです。"
  },
  {
    sentence: "The teacher asked the students to (　　　) their opinions during the discussion.",
    choices: ["express", "destroy", "prevent", "recognize"],
    answer: 0,
    explanation: "express an opinion で「意見を述べる、表現する」という意味です。",
    translation: "先生は生徒たちに、話し合いの中で自分の意見を述べるよう求めました。"
  }
];

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
