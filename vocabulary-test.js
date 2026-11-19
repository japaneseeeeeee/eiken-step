const vocabBank = window.VOCAB_DATA || [];
const $ = (selector) => document.querySelector(selector);

const screens = {
  home: $("#testHome"),
  quiz: $("#testQuiz"),
  result: $("#testResult")
};

const elements = {
  direction: $("#testDirection"),
  category: $("#testCategory"),
  record: $("#vocabTestRecord"),
  progress: $("#vocabTestProgress"),
  score: $("#vocabTestScore"),
  progressBar: $("#vocabTestProgressBar"),
  progressTrack: $("#testQuiz .progress-track"),
  questionType: $("#vocabQuestionType"),
  questionDirection: $("#vocabQuestionDirection"),
  questionNumber: $("#vocabQuestionNumber"),
  question: $("#vocabQuestion"),
  hint: $("#vocabQuestionHint"),
  choices: $("#vocabTestChoices"),
  speak: $("#testSpeakWord"),
  feedback: $("#vocabTestFeedback"),
  feedbackIcon: $("#vocabFeedbackIcon"),
  feedbackResult: $("#vocabFeedbackResult"),
  feedbackAnswer: $("#vocabFeedbackAnswer"),
  feedbackMeaning: $("#vocabFeedbackMeaning"),
  feedbackExample: $("#vocabFeedbackExample"),
  feedbackTranslation: $("#vocabFeedbackTranslation"),
  finalScore: $("#vocabFinalScore"),
  accuracy: $("#vocabAccuracy"),
  correctCount: $("#vocabCorrectCount"),
  bestScore: $("#vocabBestScore"),
  scoreRing: $("#vocabScoreRing"),
  resultMessage: $("#vocabResultMessage"),
  reviewList: $("#vocabReviewList")
};

const savedVocabulary = window.EikenProgress.read().vocabulary || {};
const totals = {
  answered: Number(savedVocabulary.testAnswered) || 0,
  correct: Number(savedVocabulary.testCorrect) || 0,
  best: Number(savedVocabulary.testBest) || 0
};
let lastIds = Array.isArray(savedVocabulary.testLastIds) ? savedVocabulary.testLastIds : [];
let testQuestions = [];
let currentQuestion = 0;
let score = 0;
let mistakes = [];
let answered = false;
let selectedAnswer = null;

elements.direction.value = savedVocabulary.testMode || "mixed";
elements.category.value = savedVocabulary.testCategory || "all";

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => { screen.hidden = key !== name; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function categoryMatches(item, category) {
  if (category === "word") return item.type !== "熟語";
  if (category === "phrase") return item.type === "熟語";
  return true;
}

function pickDirection(mode) {
  if (mode === "mixed") return Math.random() < 0.5 ? "en-ja" : "ja-en";
  return mode;
}

function makeChoices(id, direction, poolIds) {
  const correctItem = vocabBank[id];
  const valueFor = (item) => direction === "en-ja" ? item.meaning : item.word;
  const correctValue = valueFor(correctItem);
  const seen = new Set([correctValue]);
  const distractors = [];
  shuffle(poolIds).forEach((candidateId) => {
    if (distractors.length >= 3 || candidateId === id) return;
    const value = valueFor(vocabBank[candidateId]);
    if (!value || seen.has(value)) return;
    seen.add(value);
    distractors.push(value);
  });
  const choices = shuffle([correctValue, ...distractors]);
  return { choices, answer: choices.indexOf(correctValue) };
}

function buildTest() {
  const mode = elements.direction.value;
  const category = elements.category.value;
  const poolIds = vocabBank.map((_, index) => index).filter((id) => categoryMatches(vocabBank[id], category));
  const previous = new Set(lastIds);
  const fresh = poolIds.filter((id) => !previous.has(id));
  const source = fresh.length >= 10 ? fresh : poolIds;
  const ids = shuffle(source).slice(0, Math.min(10, source.length));
  lastIds = [...ids];
  testQuestions = ids.map((id) => {
    const direction = pickDirection(mode);
    const generated = makeChoices(id, direction, poolIds);
    return { id, direction, ...generated };
  });
  currentQuestion = 0;
  score = 0;
  mistakes = [];
  answered = false;
  selectedAnswer = null;
  showScreen("quiz");
  renderQuestion();
  saveTest();
}

function saveTest(session = true) {
  window.EikenProgress.updateSection(
    "vocabulary",
    {
      testAnswered: totals.answered,
      testCorrect: totals.correct,
      testBest: totals.best,
      testLastIds: lastIds,
      testMode: elements.direction.value,
      testCategory: elements.category.value,
      testSession: session ? { testQuestions, currentQuestion, score, mistakeIds: mistakes.map((item) => item.id), answered, selectedAnswer } : null
    },
    {
      href: session ? "vocabulary-test.html?resume=1" : "vocabulary-test.html",
      title: session ? "単語テストの続き" : "単語テストに再挑戦",
      detail: session ? `${currentQuestion + 1}/${testQuestions.length}・正解${score}` : `前回${score}/10・最高${totals.best}点`
    }
  );
}

function saveSettings() {
  window.EikenProgress.updateSection("vocabulary", {
    testMode: elements.direction.value,
    testCategory: elements.category.value
  });
}

function renderQuestion() {
  const question = testQuestions[currentQuestion];
  if (!question) return;
  const item = vocabBank[question.id];
  const number = currentQuestion + 1;
  const englishToJapanese = question.direction === "en-ja";
  elements.progress.textContent = `${number} / ${testQuestions.length}`;
  elements.score.textContent = `正解 ${score}`;
  elements.progressBar.style.width = `${(number / testQuestions.length) * 100}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(number));
  elements.progressTrack.setAttribute("aria-valuemax", String(testQuestions.length));
  elements.questionType.textContent = item.type;
  elements.questionDirection.textContent = englishToJapanese ? "英語 → 日本語" : "日本語 → 英語";
  elements.questionNumber.textContent = `QUESTION ${String(number).padStart(2, "0")}`;
  elements.question.textContent = englishToJapanese ? item.word : item.meaning;
  elements.hint.textContent = englishToJapanese ? "正しい日本語の意味を選んでください。" : "正しい英単語・熟語を選んでください。";
  elements.speak.hidden = !englishToJapanese;
  elements.feedback.hidden = true;
  elements.choices.replaceChildren();

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    const letter = document.createElement("span");
    letter.className = "choice-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.textContent = choice;
    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index));
    elements.choices.appendChild(button);
  });

  if (answered && Number.isInteger(selectedAnswer)) renderAnswered(selectedAnswer);
  elements.question.focus({ preventScroll: true });
}

function renderAnswered(index) {
  const question = testQuestions[currentQuestion];
  const item = vocabBank[question.id];
  const correct = index === question.answer;
  [...elements.choices.querySelectorAll(".choice")].forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.answer) button.classList.add("correct");
    if (choiceIndex === index && !correct) button.classList.add("incorrect");
  });
  elements.feedbackIcon.textContent = correct ? "✓" : "×";
  elements.feedbackIcon.className = `feedback-icon ${correct ? "correct" : "incorrect"}`;
  elements.feedbackResult.textContent = correct ? "正解です" : "正解は";
  elements.feedbackAnswer.textContent = question.choices[question.answer];
  elements.feedbackMeaning.textContent = `${item.word} ＝ ${item.meaning}`;
  elements.feedbackExample.textContent = item.example;
  elements.feedbackTranslation.textContent = `訳：${item.translation}`;
  $("#nextVocabQuestion").textContent = currentQuestion === testQuestions.length - 1 ? "結果を見る" : "次の問題へ";
  elements.feedback.hidden = false;
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  selectedAnswer = index;
  const question = testQuestions[currentQuestion];
  totals.answered += 1;
  if (index === question.answer) {
    score += 1;
    totals.correct += 1;
  } else {
    mistakes.push(question);
  }
  elements.score.textContent = `正解 ${score}`;
  renderAnswered(index);
  saveTest();
  elements.feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextQuestion() {
  if (!answered) return;
  if (currentQuestion < testQuestions.length - 1) {
    currentQuestion += 1;
    answered = false;
    selectedAnswer = null;
    renderQuestion();
    saveTest();
  } else {
    renderResult();
  }
}

function renderResult() {
  const percent = Math.round((score / testQuestions.length) * 100);
  totals.best = Math.max(totals.best, score);
  elements.finalScore.textContent = String(score);
  elements.accuracy.textContent = `${percent}%`;
  elements.correctCount.textContent = `${score}問`;
  elements.bestScore.textContent = `${totals.best}点`;
  elements.scoreRing.style.background = `conic-gradient(var(--blue) ${percent}%, #dfe9f1 ${percent}%)`;
  elements.resultMessage.textContent = score === 10 ? "全問正解です。しっかり覚えられています！" : score >= 7 ? "よくできました。間違えた項目だけ復習しましょう。" : "カードで意味と例文を確認して、もう一度挑戦しましょう。";
  elements.reviewList.replaceChildren();
  if (mistakes.length === 0) {
    const perfect = document.createElement("div");
    perfect.className = "perfect-message";
    perfect.textContent = "復習する項目はありません。全問正解です！";
    elements.reviewList.appendChild(perfect);
  } else {
    mistakes.forEach((question) => {
      const item = vocabBank[question.id];
      const card = document.createElement("article");
      card.className = "review-item";
      const heading = document.createElement("p");
      const word = document.createElement("strong");
      word.textContent = item.word;
      heading.append(word, document.createTextNode(` — ${item.meaning}`));
      const example = document.createElement("p");
      example.className = "review-sentence";
      example.textContent = item.example;
      const translation = document.createElement("p");
      translation.className = "vocab-review-translation";
      translation.textContent = item.translation;
      card.append(heading, example, translation);
      elements.reviewList.appendChild(card);
    });
  }
  saveTest(false);
  renderRecord();
  showScreen("result");
  $("#vocabResultTitle").focus({ preventScroll: true });
}

function renderRecord() {
  if (totals.answered === 0) {
    elements.record.textContent = "まだテスト記録はありません。";
    return;
  }
  const rate = Math.round((totals.correct / totals.answered) * 100);
  elements.record.textContent = `累計 ${totals.answered}問・正答率 ${rate}%・最高 ${totals.best}/10点`;
}

function restoreTest() {
  const session = savedVocabulary.testSession;
  if (!session || !Array.isArray(session.testQuestions) || session.testQuestions.length !== 10) return false;
  if (!session.testQuestions.every((question) => vocabBank[question.id] && Array.isArray(question.choices))) return false;
  testQuestions = session.testQuestions;
  currentQuestion = Math.min(Math.max(Number(session.currentQuestion) || 0, 0), testQuestions.length - 1);
  score = Number(session.score) || 0;
  const mistakeIds = new Set(session.mistakeIds || []);
  mistakes = testQuestions.filter((question) => mistakeIds.has(question.id));
  answered = Boolean(session.answered);
  selectedAnswer = Number.isInteger(session.selectedAnswer) ? session.selectedAnswer : null;
  showScreen("quiz");
  renderQuestion();
  return true;
}

$("#startVocabTest").addEventListener("click", buildTest);
$("#retryVocabTest").addEventListener("click", buildTest);
$("#nextVocabQuestion").addEventListener("click", nextQuestion);
$("#quitVocabTest").addEventListener("click", () => { window.location.href = "vocabulary.html"; });
$("#backToWords").addEventListener("click", () => { window.location.href = "vocabulary.html"; });
elements.speak.addEventListener("click", () => window.EikenAudio.speak(vocabBank[testQuestions[currentQuestion].id].word, { rate: 0.78 }));
elements.direction.addEventListener("change", saveSettings);
elements.category.addEventListener("change", saveSettings);

renderRecord();
if (new URLSearchParams(window.location.search).get("resume") === "1") restoreTest();
