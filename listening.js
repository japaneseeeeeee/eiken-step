const listening = window.LISTENING_DATA || [];
let current = 0;
let score = 0;
let answered = false;
const $ = (selector) => document.querySelector(selector);

function resetPlayerLabel() {
  const button = $("#playAudio");
  button.disabled = false;
  button.querySelector("strong").textContent = "会話を再生する";
  button.querySelector("small").textContent = "録音済みの男女音声で再生";
}

function render() {
  answered = false;
  window.EikenAudio.stop();
  resetPlayerLabel();
  const question = listening[current];
  $("#listenProgress").textContent = `${current + 1} / ${listening.length}`;
  $("#listenNumber").textContent = `QUESTION ${String(current + 1).padStart(2, "0")}`;
  $("#listenQuestion").textContent = question.question;
  $("#listenFeedback").hidden = true;
  $("#listenChoices").innerHTML = question.choices.map((choice, index) => `<button class="choice" data-i="${index}"><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${choice}</span></button>`).join("");
  document.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", () => answer(Number(button.dataset.i))));
}

function play() {
  const question = listening[current];
  window.EikenAudio.playDialogue(question.audio, question.script, {
    onStart() {
      const button = $("#playAudio");
      button.disabled = true;
      button.querySelector("strong").textContent = "再生中…";
      button.querySelector("small").textContent = "自然な間を入れて再生しています";
    },
    onEnd: resetPlayerLabel,
    onError: resetPlayerLabel
  });
}

function answer(index) {
  if (answered) return;
  answered = true;
  const question = listening[current];
  const correct = index === question.answer;
  if (correct) score += 1;
  document.querySelectorAll(".choice").forEach((button, choiceIndex) => {
    button.disabled = true;
    if (choiceIndex === question.answer) button.classList.add("correct");
    if (choiceIndex === index && !correct) button.classList.add("incorrect");
  });
  $("#listenResult").textContent = correct ? "正解です！" : "惜しい！ 正解を確認しましょう。";
  $("#listenExplanation").textContent = question.explanation;
  $("#listenScript").textContent = question.script;
  $("#listenTranslation").textContent = `訳：${question.translation}`;
  $("#nextListen").textContent = current === listening.length - 1 ? "結果を見る" : "次の問題へ";
  $("#listenFeedback").hidden = false;
}

function next() {
  if (!answered) return;
  if (current < listening.length - 1) {
    current += 1;
    render();
  } else {
    window.EikenAudio.stop();
    $(".listening-card").hidden = true;
    $("#listenComplete").hidden = false;
    $("#listenScore").textContent = `${listening.length}問中 ${score}問正解でした。`;
  }
}

function retry() {
  current = 0;
  score = 0;
  $(".listening-card").hidden = false;
  $("#listenComplete").hidden = true;
  render();
}

$("#playAudio").addEventListener("click", play);
$("#nextListen").addEventListener("click", next);
$("#retryListen").addEventListener("click", retry);
window.addEventListener("beforeunload", () => window.EikenAudio.stop());
render();
