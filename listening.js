const listening = window.LISTENING_DATA || [];
const part1Bank = listening.filter((item) => item.part === 1);
const part2Bank = listening.filter((item) => item.part === 2);
const $ = (selector) => document.querySelector(selector);

let mode = "practice";
let questions = [...listening];
let current = 0;
let score = 0;
let answered = false;
let played = false;
let countdownId = null;
let secondsLeft = 10;
let selectedAnswers = [];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildQuestionSet() {
  if (mode === "mock") {
    return [...shuffle(part1Bank).slice(0, 15), ...shuffle(part2Bank).slice(0, 15)];
  }
  return [...listening];
}

function clearCountdown() {
  if (countdownId) window.clearInterval(countdownId);
  countdownId = null;
  secondsLeft = 10;
  $("#listenTimer").hidden = true;
}

function setPlayerCopy(title, subtitle, disabled = false) {
  const button = $("#playAudio");
  button.disabled = disabled;
  button.querySelector("strong").textContent = title;
  button.querySelector("small").textContent = subtitle;
}

function resetPlayerLabel() {
  if (mode === "mock" && played) {
    setPlayerCopy("再生済み", "模試では音声は1回だけ流れます", true);
  } else {
    setPlayerCopy(
      mode === "mock" ? "音声を再生して開始" : "音声を再生する",
      mode === "mock" ? "英文と質問は1回だけ再生" : "英文と質問を続けて再生"
    );
  }
}

function setChoicesEnabled(enabled) {
  document.querySelectorAll(".choice").forEach((button) => {
    button.disabled = !enabled;
  });
}

function render({ autoPlay = false } = {}) {
  clearCountdown();
  answered = false;
  played = false;
  window.EikenAudio.stop();

  const question = questions[current];
  if (!question) return;

  $("#listenProgress").textContent = `${current + 1} / ${questions.length}`;
  $("#listenNumber").textContent = mode === "mock"
    ? `No. ${current + 1}`
    : `QUESTION ${String(current + 1).padStart(2, "0")}`;
  $("#listenPart").textContent = question.part === 1 ? "第1部・対話" : "第2部・英文";
  $("#listenQuestion").textContent = question.question;
  $("#listenQuestion").hidden = mode === "mock";
  $("#listenFeedback").hidden = true;

  $("#listenChoices").innerHTML = question.choices.map((choice, index) => {
    const label = mode === "mock" ? index + 1 : String.fromCharCode(65 + index);
    return `<button class="choice" data-i="${index}"><span class="choice-letter">${label}</span><span>${choice}</span></button>`;
  }).join("");

  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => answer(Number(button.dataset.i)));
  });

  if (mode === "mock") setChoicesEnabled(false);
  resetPlayerLabel();

  if (autoPlay) {
    setPlayerCopy("次の音声を準備中…", "自動的に再生します", true);
    window.setTimeout(play, 700);
  }
}

function play() {
  if (mode === "mock" && played) return;
  const question = questions[current];
  played = true;
  const sources = [...(question.audio || [])];
  if (question.questionAudio) sources.push(question.questionAudio);

  window.EikenAudio.playDialogue(sources, question.script, {
    pauseBeforeLast: 800,
    onStart() {
      setPlayerCopy("再生中…", "英文のあとに質問が流れます", true);
      if (mode === "mock") setChoicesEnabled(true);
    },
    onEnd() {
      if (mode === "mock") {
        setPlayerCopy("再生済み", "模試では再生は1回だけです", true);
        startCountdown();
      } else {
        resetPlayerLabel();
      }
    },
    onError() {
      setPlayerCopy("端末音声で再生中…", "録音の読み込みに失敗したため切り替えました", true);
    }
  });
}

function startCountdown() {
  clearCountdown();
  secondsLeft = 10;
  const timer = $("#listenTimer");
  timer.hidden = false;
  timer.textContent = `解答時間 ${secondsLeft}秒`;

  countdownId = window.setInterval(() => {
    secondsLeft -= 1;
    timer.textContent = answered
      ? `回答しました・次の問題まで ${secondsLeft}秒`
      : `解答時間 ${secondsLeft}秒`;
    if (secondsLeft <= 0) finishMockQuestion();
  }, 1000);
}

function answer(index) {
  if (answered) return;
  answered = true;
  selectedAnswers[current] = index;
  const question = questions[current];
  const correct = index === question.answer;
  if (correct) score += 1;

  document.querySelectorAll(".choice").forEach((button, choiceIndex) => {
    button.disabled = true;
    if (mode === "mock") {
      if (choiceIndex === index) button.classList.add("selected");
      return;
    }
    if (choiceIndex === question.answer) button.classList.add("correct");
    if (choiceIndex === index && !correct) button.classList.add("incorrect");
  });

  if (mode === "mock") {
    $("#listenTimer").textContent = `回答しました・次の問題まで ${secondsLeft}秒`;
    return;
  }

  $("#listenResult").textContent = correct ? "正解です！" : "惜しい！ 正解を確認しましょう。";
  $("#listenExplanation").textContent = question.explanation;
  $("#listenScript").textContent = question.script;
  $("#listenTranslation").textContent = `訳：${question.translation}`;
  $("#nextListen").textContent = current === questions.length - 1 ? "結果を見る" : "次の問題へ";
  $("#listenFeedback").hidden = false;
}

function finishMockQuestion() {
  clearCountdown();
  setChoicesEnabled(false);
  if (current < questions.length - 1) {
    current += 1;
    render({ autoPlay: true });
  } else {
    showComplete();
  }
}

function next() {
  if (mode === "mock" || !answered) return;
  if (current < questions.length - 1) {
    current += 1;
    render();
  } else {
    showComplete();
  }
}

function scoreForPart(part) {
  return questions.reduce((total, question, index) => {
    return total + (question.part === part && selectedAnswers[index] === question.answer ? 1 : 0);
  }, 0);
}

function showComplete() {
  clearCountdown();
  window.EikenAudio.stop();
  $(".listening-card").hidden = true;
  $("#listenComplete").hidden = false;
  $("#listenScore").textContent = `${questions.length}問中 ${score}問正解でした。`;
  const part1Total = questions.filter((question) => question.part === 1).length;
  const part2Total = questions.filter((question) => question.part === 2).length;
  $("#listenScoreDetail").textContent = `第1部 ${scoreForPart(1)} / ${part1Total}　・　第2部 ${scoreForPart(2)} / ${part2Total}`;
}

function startSession() {
  questions = buildQuestionSet();
  current = 0;
  score = 0;
  selectedAnswers = [];
  $(".listening-card").hidden = false;
  $("#listenComplete").hidden = true;
  render();
}

function setMode(nextMode) {
  mode = nextMode;
  $("#practiceMode").classList.toggle("active", mode === "practice");
  $("#mockMode").classList.toggle("active", mode === "mock");
  $("#modeDescription").textContent = mode === "mock"
    ? "本番と同じ第1部15問＋第2部15問。英文と質問は1回だけ流れ、各問の解答時間は10秒です。"
    : "全115問を、解説を確認しながら何度でも練習できます。";
  startSession();
}

$("#playAudio").addEventListener("click", play);
$("#nextListen").addEventListener("click", next);
$("#retryListen").addEventListener("click", startSession);
$("#practiceMode").addEventListener("click", () => setMode("practice"));
$("#mockMode").addEventListener("click", () => setMode("mock"));
window.addEventListener("beforeunload", () => {
  clearCountdown();
  window.EikenAudio.stop();
});

startSession();
